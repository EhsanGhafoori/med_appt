import { useMemo, useState } from "react";
import FindDoctorSearch from "./FindDoctorSearch.jsx";
import AppointmentForm from "./AppointmentForm.jsx";
import AppointmentFormIC from "./AppointmentFormIC.jsx";
import GiveReviews from "./GiveReviews.jsx";
import ProfileCard from "./ProfileCard.jsx";
import DoctorCard from "./DoctorCard.jsx";

const DEMO_DOCTOR = { id: "doc-1", name: "Dr. Samira Khan", specialty: "Family medicine", city: "Remote clinic" };

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [selectedId, setSelectedId] = useState(DEMO_DOCTOR.id);
  const [refreshKey, setRefreshKey] = useState(0);

  const selectedDoctor = useMemo(() => {
    return doctors.find((d) => d.id === selectedId) || DEMO_DOCTOR;
  }, [doctors, selectedId]);

  return (
    <div className="page">
      <h2>Appointments</h2>
      <ProfileCard />
      <FindDoctorSearch
        onResults={(list) => {
          setDoctors(list.length ? list : [DEMO_DOCTOR]);
          if (list[0]?.id) setSelectedId(list[0].id);
        }}
      />
      <DoctorCard
        key={refreshKey}
        doctor={selectedDoctor}
        appointmentId="appt-demo-1"
        onCancelled={() => setRefreshKey((k) => k + 1)}
      />
      <AppointmentForm doctorId={selectedDoctor.id} onBooked={() => setRefreshKey((k) => k + 1)} />
      <AppointmentFormIC doctorId={selectedDoctor.id} />
      <GiveReviews doctorId={selectedDoctor.id} />
    </div>
  );
}
