import { BadgeDetailsView } from '@/components/dashboard/badges/badge-details-view'

export default function BadgeDetailsPage({
  params
}: {
  params: { id: string }
}) {
  return <BadgeDetailsView badgeId={params.id} />;
}