import JobDetailContent from "./JobDetailContent";
import Sidebar from "./Sidebar";

export default function Container() {
  return (
    <div className="container">
      <Sidebar />
      <JobDetailContent />
    </div>
  );
}
