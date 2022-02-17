import { CUSTOM_KEY } from '../lib/constant';
import { CustomData } from '../models/CustomData';

export class CustomService {
  public static save(custom: CustomData) {
    const old = CustomService.get();

    const newCustom: CustomData = {
      name: custom.name,
      email: custom.email,
      address: custom.address,
      phone: custom.phone,
    };

    newCustom.revisionOne = custom.revisionOne ?? old.revisionOne;
    newCustom.revisionTwo = custom.revisionTwo ?? old.revisionTwo;
    newCustom.revisionThree = custom.revisionThree ?? old.revisionThree;
    newCustom.consultation = custom.consultation ?? old.consultation;

    localStorage.setItem(CUSTOM_KEY, JSON.stringify(newCustom));
  }

  public static get(): CustomData {
    return JSON.parse(localStorage.getItem(CUSTOM_KEY) ?? '{}');
  }
}
