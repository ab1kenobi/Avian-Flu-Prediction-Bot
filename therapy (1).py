import pandas as pd
from transformers import BertTokenizer, AutoTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.model_selection import train_test_split
import torch
from torch.utils.data import Dataset, DataLoader

class TherapyDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

def load_and_preprocess():
    splits = {
        'train': 'data/train-00000-of-00001-a69102d75cac5454.parquet',
        'test': 'data/test-00000-of-00001-836a719166e8754f.parquet'
    }
    df = pd.read_parquet("hf://datasets/michelleyunun/therapydata/" + splits["train"])
    
    # Clean and prepare data
    df['utterance_text'] = df['utterance_text'].str.strip()
    
    # Split by interlocutor
    client_df = df[df['interlocutor'] == 'client']
    therapist_df = df[df['interlocutor'] == 'therapist']
    
    # Create binary labels (example: positive/supportive responses = 1, others = 0)
    # You'll need to define your own labeling logic
    therapist_labels = [1 if len(response) > 0 else 0 for response in therapist_df['utterance_text']]
    
    # Tokenize inputs
    min_length = min(len(client_df), len(therapist_df))
    client_df = client_df.iloc[:min_length]
    therapist_df = therapist_df.iloc[:min_length]
    
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    encodings = tokenizer(client_df['utterance_text'].tolist(),
                         truncation=True,
                         padding=True,
                         max_length=512,
                         return_tensors='pt')
    
    encodings = {key: val.numpy() for key, val in encodings.items()}
    
    return encodings, therapist_labels

def split_data(encodings, labels):
    train_idx, val_idx = train_test_split(
        range(len(labels)), test_size=0.2, random_state=42
    )
    
    train_encodings = {key: val[train_idx] for key, val in encodings.items()}
    val_encodings = {key: val[val_idx] for key, val in encodings.items()}
    
    train_labels = [labels[i] for i in train_idx]
    val_labels = [labels[i] for i in val_idx]
    
    return train_encodings, val_encodings, train_labels, val_labels

def train(train_encodings, val_encodings, train_labels, val_labels):
    # Create datasets
    train_dataset = TherapyDataset(train_encodings, train_labels)
    val_dataset = TherapyDataset(val_encodings, val_labels)
    
    # Initialize model
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
    
    training_args = TrainingArguments(
        output_dir='./results',
        per_device_train_batch_size=16,
        num_train_epochs=3,
        logging_dir='./logs',
        logging_steps=10,
        save_steps=100,
        save_total_limit=2,
        evaluation_strategy="steps",
        eval_steps=500,
        learning_rate=5e-5,
        weight_decay=0.01,
        push_to_hub=False
    )
    
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset
    )
    
    trainer.train()
    print("Training complete. Evaluating...")
    metrics = trainer.evaluate()
    print(f"Evaluation results: {metrics}")
    
    return trainer, model

def main():
    # Load and preprocess data
    encodings, labels = load_and_preprocess()
    
    # Split data
    train_encodings, val_encodings, train_labels, val_labels = split_data(encodings, labels)
    
    # Train model
    trainer, model = train(train_encodings, val_encodings, train_labels, val_labels)
    
    # Save model
    model.save_pretrained("./therapy_model")

if __name__ == "__main__":
    main()