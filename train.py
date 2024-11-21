import pandas as pd
import numpy as np
from faker import Faker
import random

# Initialize Faker for generating synthetic data
fake = Faker()

# Generate synthetic data
data = []

for _ in range(1000):
    ip = fake.ipv4()
    time = fake.date_time_this_year()
    method = random.choice(['GET', 'POST'])
    url = random.choice(['/contact.html', '/login', '/products', '/index.html', '/upload', '/admin', '/profile', '/comment', '/settings', '/help'])
    status = random.choice([200, 301, 403, 404, 500])
    size = random.randint(0, 5000)
    duration = random.randint(100, 5000)
    referer = fake.url() if random.choice([True, False]) else '-'
    agent = fake.user_agent()
    
    data.append([ip, time, method, url, status, size, duration, referer, agent])

# Create DataFrame
columns = ['ip', 'time', 'method', 'url', 'status', 'size', 'duration', 'referer', 'agent']
df_train = pd.DataFrame(data, columns=columns)

# Convert time to the appropriate format
df_train['time'] = df_train['time'].dt.strftime('%Y-%m-%d %H:%M:%S %z')

# Display the first few rows of the DataFrame
print(df_train.head())

# Save the dataset to a CSV file
df_train.to_csv('test.csv', index=False)
