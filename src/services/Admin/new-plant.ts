import {api} from "boot/axios";
import {NewPlant} from "src/types/Admin/new-plant";

export const newPlant = async (form: any) => {
    const formNewPlant = new FormData();
    formNewPlant.append('name', form.name)
    formNewPlant.append('scientific_name', form.scientific_name)

    form.indication.forEach((indication: string, index: number) => {
      formNewPlant.append(`indication[${index}][name]`, indication);
    });

    form.contraindication.forEach((contraindication: string, index: number) => {
      formNewPlant.append(`contraindication[${index}][name]`, contraindication);
    });

    form.medicines.forEach((medicine: string, index: number) => {
      formNewPlant.append(`medicines[${index}][name]`, medicine);
    });

    if (form.file) {
          formNewPlant.append('file', form.file)
    }
    const {data} = await api.post('/api/v1/new-plant', formNewPlant)

    return data.data
}
