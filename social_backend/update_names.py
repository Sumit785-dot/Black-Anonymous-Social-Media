from apps.users.models import User

# Update alice to Sumit
try:
    alice = User.objects.get(user_id='alice')
    alice.name = 'Sumit'
    alice.save()
    print(f"✅ Updated alice -> Sumit")
except User.DoesNotExist:
    print("❌ User 'alice' not found")

# Update bob to Anand
try:
    bob = User.objects.get(user_id='bob')
    bob.name = 'Anand'
    bob.save()
    print(f"✅ Updated bob -> Anand")
except User.DoesNotExist:
    print("❌ User 'bob' not found")

print("\n✅ All names updated successfully!")
