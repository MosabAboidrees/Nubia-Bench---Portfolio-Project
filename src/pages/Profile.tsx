import React from 'react';
import { useAuthStore } from '../store/authStore';
import { ProfileForm } from '../components/profile/ProfileForm';
import { Card } from '../components/ui/Card';

export default function Profile() {
  const { user, updateUser } = useAuthStore();

  if (!user) {
    return null;
  }

  const handleUpdateProfile = (userData: Partial<User>) => {
    updateUser(userData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and profile information
        </p>
      </div>
      <ProfileForm user={user} onUpdate={handleUpdateProfile} />
    </div>
  );
}