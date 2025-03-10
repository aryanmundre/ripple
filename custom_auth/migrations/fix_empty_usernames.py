from django.db import migrations

def fix_empty_usernames(apps, schema_editor):
    CustomUser = apps.get_model('custom_auth', 'CustomUser')
    # Find users with empty usernames and set their username to their email
    for user in CustomUser.objects.filter(username=''):
        user.username = user.email
        user.save()

class Migration(migrations.Migration):
    dependencies = [
        ('custom_auth', '0003_customuser_display_name_customuser_firebase_uid'),
    ]

    operations = [
        migrations.RunPython(fix_empty_usernames),
    ]