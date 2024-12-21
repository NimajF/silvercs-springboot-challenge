import { Book } from "../types/book";

export default function formValidator(formData: Book): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!formData.title) errors.title = "El título es obligatorio.";
  if (!formData.author) errors.author = "El autor es obligatorio.";
  if (!formData.isbn) errors.isbn = "El ISBN es obligatorio.";
  if (!formData.publishDate)
    errors.publishDate = "La fecha de publicación es obligatoria.";

  return errors;
}
