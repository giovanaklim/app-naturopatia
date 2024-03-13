import {api} from "boot/axios";

export const updateUser = async (form: any, company:any) => {
  form.company_id = company.id
  form.company_email = company.email
  form.company_phone = company.phone
  console.log(form)
  const {data} = await api.post('/api/v1/update-user', form)

  return data.data
}
