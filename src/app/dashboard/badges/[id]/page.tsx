import { BadgeDetailsView } from '@/components/dashboard/badges/badge-details-view'

// @ts-nocheck
export default function BadgeDetailsPage({
  params,
}: any) {
  return <BadgeDetailsView badgeId={params.id} />;
}