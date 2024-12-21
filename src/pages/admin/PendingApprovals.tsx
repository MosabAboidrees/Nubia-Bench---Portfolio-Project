import { useAuthStore } from '../../store/authStore';
import { Card, CardContent } from '../../components/ui/Card';
import { User, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function PendingApprovals() {
  const { getPendingUsers, approveUser, rejectUser } = useAuthStore();
  const pendingUsers = getPendingUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>

      {pendingUsers.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-6">
              <Clock className="mx-auto h-12 w-12 text-primary-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Pending Approvals</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no pending registration requests at the moment.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingUsers.map(user => (
            <Card key={user.id}>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand-100 text-sand-800">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => approveUser(user.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => rejectUser(user.id)}
                    className="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}