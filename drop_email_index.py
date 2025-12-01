#!/usr/bin/env python3
"""
Script to drop email_1 index from BOTH MongoDB databases
"""
from pymongo import MongoClient
from pymongo.errors import OperationFailure

MONGO_URI = "mongodb+srv://sumit_user:MyStrongPassword123@cluster0.hsophhy.mongodb.net/?retryWrites=true&w=majority"

databases_to_fix = ['social_db', 'djongo_test']

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10000)
    
    for db_name in databases_to_fix:
        print(f"\n{'='*50}")
        print(f"Processing database: {db_name}")
        print('='*50)
        
        db = client[db_name]
        collection = db['users_user']
        
        # List current indexes
        print("\nCurrent indexes:")
        for index in collection.list_indexes():
            print(f"  - {index['name']}")
        
        # Try to drop email_1 index
        try:
            collection.drop_index('email_1')
            print(f"\n✅ Successfully dropped email_1 index from {db_name}")
        except OperationFailure as e:
            if 'index not found' in str(e).lower():
                print(f"\n⚠️  email_1 index not found in {db_name} (already dropped or doesn't exist)")
            else:
                print(f"\n❌ Error dropping index from {db_name}: {e}")
        
        # List indexes after drop
        print(f"\nIndexes after drop in {db_name}:")
        for index in collection.list_indexes():
            print(f"  - {index['name']}")
    
    print(f"\n{'='*50}")
    print("✅ All done!")
    print('='*50)
    
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
finally:
    if 'client' in locals():
        client.close()
