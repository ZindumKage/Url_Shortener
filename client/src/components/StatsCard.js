export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}