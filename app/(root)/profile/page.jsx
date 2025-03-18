import ProfileClient from "@/components/shared/ProfileClient";

export default function ProfilePage({ searchParams }) {
  // Extract search parameters directly
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  console.log(ordersPage)

  // Pass the parameters to a client component
  return (
    <ProfileClient ordersPage={ordersPage} eventsPage={eventsPage} />
  );
}