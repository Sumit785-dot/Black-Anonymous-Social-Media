from apps.users.models import User, Follow

# Get users
testuser1 = User.objects.get(user_id='testuser1')
sumit = User.objects.get(user_id='alice')  # This is Sumit
anand = User.objects.get(user_id='bob')    # This is Anand

# Create follow relationships (Sumit and Anand follow testuser1)
follow1, created1 = Follow.objects.get_or_create(
    follower=sumit,
    following=testuser1
)
if created1:
    print(f"✅ Sumit (@{sumit.user_id}) is now following @{testuser1.user_id}")
else:
    print(f"ℹ️  Sumit (@{sumit.user_id}) was already following @{testuser1.user_id}")

follow2, created2 = Follow.objects.get_or_create(
    follower=anand,
    following=testuser1
)
if created2:
    print(f"✅ Anand (@{anand.user_id}) is now following @{testuser1.user_id}")
else:
    print(f"ℹ️  Anand (@{anand.user_id}) was already following @{testuser1.user_id}")

# Also make testuser1 follow them back (mutual follows)
follow3, created3 = Follow.objects.get_or_create(
    follower=testuser1,
    following=sumit
)
if created3:
    print(f"✅ @{testuser1.user_id} is now following Sumit (@{sumit.user_id})")
else:
    print(f"ℹ️  @{testuser1.user_id} was already following Sumit (@{sumit.user_id})")

follow4, created4 = Follow.objects.get_or_create(
    follower=testuser1,
    following=anand
)
if created4:
    print(f"✅ @{testuser1.user_id} is now following Anand (@{anand.user_id})")
else:
    print(f"ℹ️  @{testuser1.user_id} was already following Anand (@{anand.user_id})")

print("\n✅ Follow relationships created successfully!")
print(f"@{testuser1.user_id} has {testuser1.followers.count()} followers")
print(f"@{testuser1.user_id} is following {testuser1.following.count()} users")
