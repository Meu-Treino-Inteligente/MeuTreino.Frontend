interface UserFormData {
  name: string;
  age: number | null;
  gender: string;
  weight: number | null;
  height: number | null;
  goal: number | null;
  availableDays: number | null;
  trainingLocation: string;
  exercicesPerDay: number | null;
}

const STORAGE_KEY_FORM_DATA = "register_form_data";
const STORAGE_KEY_CURRENT_STEP = "register_current_step";
const STORAGE_KEY_USER_ID = "user_id";
const STORAGE_KEY_PIX_PAYMENT = "pix_payment_data";

export function save_register_form_data(form_data: UserFormData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_FORM_DATA, JSON.stringify(form_data));
  } catch (error) {
    console.error("Error saving form data to localStorage:", error);
  }
}

export function load_register_form_data(): UserFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY_FORM_DATA);
    if (!data) return null;
    return JSON.parse(data) as UserFormData;
  } catch (error) {
    console.error("Error loading form data from localStorage:", error);
    return null;
  }
}

export function save_register_current_step(step: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_STEP, step.toString());
  } catch (error) {
    console.error("Error saving current step to localStorage:", error);
  }
}

export function load_register_current_step(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const step = localStorage.getItem(STORAGE_KEY_CURRENT_STEP);
    if (!step) return null;
    const step_number = parseInt(step, 10);
    return isNaN(step_number) ? null : step_number;
  } catch (error) {
    console.error("Error loading current step from localStorage:", error);
    return null;
  }
}

export function save_user_id(user_id: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_USER_ID, user_id.toString());
  } catch (error) {
    console.error("Error saving user ID to localStorage:", error);
  }
}

export function load_user_id(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const user_id = localStorage.getItem(STORAGE_KEY_USER_ID);
    if (!user_id) return null;
    const id_number = parseInt(user_id, 10);
    return isNaN(id_number) ? null : id_number;
  } catch (error) {
    console.error("Error loading user ID from localStorage:", error);
    return null;
  }
}

export function clear_register_session(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_FORM_DATA);
    localStorage.removeItem(STORAGE_KEY_CURRENT_STEP);
    // Não limpar o user_id aqui, pois será usado na página de pagamento
  } catch (error) {
    console.error("Error clearing register session:", error);
  }
}

export function clear_user_id(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_USER_ID);
  } catch (error) {
    console.error("Error clearing user ID:", error);
  }
}

interface PixPaymentData {
  pix_code: string;
  pix_qrcode: string;
  expires_at: string;
  payment_id: string;
  user_id: number;
  customer: {
    name: string;
    email: string;
    cpf: string;
    cellphone?: string;
  };
}

export function save_pix_payment_data(data: PixPaymentData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PIX_PAYMENT, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving PIX payment data to localStorage:", error);
  }
}

export function load_pix_payment_data(): PixPaymentData | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY_PIX_PAYMENT);
    if (!data) return null;
    return JSON.parse(data) as PixPaymentData;
  } catch (error) {
    console.error("Error loading PIX payment data from localStorage:", error);
    return null;
  }
}

export function clear_pix_payment_data(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_PIX_PAYMENT);
  } catch (error) {
    console.error("Error clearing PIX payment data:", error);
  }
}

export function is_pix_payment_expired(payment_data: PixPaymentData | null): boolean {
  if (!payment_data || !payment_data.expires_at) return true;
  
  try {
    const expiry = new Date(payment_data.expires_at);
    const now = new Date();
    return now >= expiry;
  } catch (error) {
    console.error("Error checking payment expiration:", error);
    return true;
  }
}
