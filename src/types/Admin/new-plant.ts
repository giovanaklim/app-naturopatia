export  interface NewPlant{
  name : string,
  scientific_name: string,
  indication: { name: string }[]
  contraindication: { name: string }[]
  drug_interaction: { name: string }[]
  medicines: { name: string }[]
  file: File
}
