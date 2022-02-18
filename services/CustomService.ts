import {
  CUSTOM_KEY,
  CUSTOM_PAYMENT_KEY,
  CUSTOM_STEP_KEY,
} from '../lib/constant';
import { CustomData } from '../models/CustomData';
import { Payment } from '../models/Payment';

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

  public static savePayment(payment: Payment) {
    localStorage.setItem(CUSTOM_PAYMENT_KEY, JSON.stringify(payment));
  }

  public static getPayment(): Payment {
    return JSON.parse(localStorage.getItem(CUSTOM_PAYMENT_KEY) ?? '{}');
  }

  public static saveActiveStep(step: number) {
    localStorage.setItem(CUSTOM_STEP_KEY, JSON.stringify(step));
  }

  public static getActiveStep(): string {
    return localStorage.getItem(CUSTOM_STEP_KEY) ?? '0';
  }
}
