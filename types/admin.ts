export const statuses = ["new","contacted","awaiting_photos","survey_booked","quote_preparing","quote_sent","won","lost","completed"] as const;
export const priorities = ["low","normal","high","urgent"] as const;
export type EnquiryStatus = typeof statuses[number];
export type EnquiryPriority = typeof priorities[number];
export type PhotoRecord = { path: string; fileName: string; contentType: string; size: number };
export type TrackfitEnquiry = {
  id:string; reference_number:string; created_at:string; updated_at:string; postcode:string; property_type:string; track_type:string;
  track_quantity:string; full_name:string; email:string; phone:string; preferred_contact:string; customer_notes:string|null;
  photo_paths:PhotoRecord[]; source:string; utm_source:string|null; utm_medium:string|null; utm_campaign:string|null; landing_page:string|null;
  status:EnquiryStatus; priority:EnquiryPriority; internal_notes:string|null; quoted_amount:number|null; survey_appointment:string|null;
  installation_appointment:string|null; last_contacted_at:string|null; assigned_to:string|null;
};
export type Activity = { id:string; created_at:string; activity_type:string; description:string; changes:Record<string,unknown> };
