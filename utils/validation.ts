/**
 * Validação de CPF
 */
export function validate_cpf(cpf: string): boolean {
  // Remove caracteres não numéricos
  const clean_cpf = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (clean_cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(clean_cpf)) return false;

  // Validação dos dígitos verificadores
  let sum = 0;
  let remainder: number;

  // Valida primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(clean_cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(clean_cpf.substring(9, 10))) return false;

  sum = 0;
  // Valida segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(clean_cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(clean_cpf.substring(10, 11))) return false;

  return true;
}

/**
 * Formata CPF para exibição (000.000.000-00)
 */
export function format_cpf(cpf: string): string {
  const clean_cpf = cpf.replace(/\D/g, "");

  if (clean_cpf.length <= 3) return clean_cpf;
  if (clean_cpf.length <= 6) {
    return `${clean_cpf.slice(0, 3)}.${clean_cpf.slice(3)}`;
  }
  if (clean_cpf.length <= 9) {
    return `${clean_cpf.slice(0, 3)}.${clean_cpf.slice(3, 6)}.${clean_cpf.slice(
      6
    )}`;
  }
  return `${clean_cpf.slice(0, 3)}.${clean_cpf.slice(3, 6)}.${clean_cpf.slice(
    6,
    9
  )}-${clean_cpf.slice(9, 11)}`;
}

/**
 * Remove formatação do CPF (apenas números)
 */
export function unformat_cpf(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

/**
 * Validação de Email
 */
export function validate_email(email: string): boolean {
  if (!email || email.trim() === "") return false;

  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email_regex.test(email.trim());
}

/**
 * Formata telefone/celular para exibição (00) 00000-0000
 */
export function format_phone(phone: string): string {
  const clean_phone = phone.replace(/\D/g, "");

  if (clean_phone.length <= 2) return clean_phone;
  if (clean_phone.length <= 7) {
    return `(${clean_phone.slice(0, 2)}) ${clean_phone.slice(2)}`;
  }
  return `(${clean_phone.slice(0, 2)}) ${clean_phone.slice(
    2,
    7
  )}-${clean_phone.slice(7, 11)}`;
}

/**
 * Remove formatação do telefone (apenas números)
 */
export function unformat_phone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Validação de telefone/celular brasileiro
 */
export function validate_phone(phone: string): boolean {
  const clean_phone = unformat_phone(phone);
  // Valida telefone/celular brasileiro (10 ou 11 dígitos)
  return clean_phone.length >= 10 && clean_phone.length <= 11;
}
