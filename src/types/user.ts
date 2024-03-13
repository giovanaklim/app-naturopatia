export interface User {
  id: string;
  name: string;
  password: string;
  course_id?: string;
  active_from?: string;
  active_to?: string;
  type: 'admin' | 'user';
  company_email: string;
  company_phone: string;
}
