from pymongo import MongoClient

users = [
    {   
        "username": "johndoe",
        "email": "john@doe.com",
        "full_name": "John Doe",
        "disabled": False
    }
]

def seed_data():
    client = MongoClient("mongodb://localhost:27017")
    database = client["chat"]
    collection = database["users"]
    
    # Insert the data into the collection
    collection.insert_many(users)
    print("Data seeded successfully")
    client.close()


if __name__ == "__main__":
    seed_data()