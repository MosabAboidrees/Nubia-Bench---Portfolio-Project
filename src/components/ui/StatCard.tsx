import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './Card';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

export function StatCard({ icon: Icon, title, value }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-primary-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}