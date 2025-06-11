type dialogOrNull = HTMLDialogElement | null;

export function openModal(id: string) {
  const dialogHtml = document.getElementById(id) as dialogOrNull;
  dialogHtml?.showModal();
}

export function closeModal(id: string) {
  const dialogHtml = document.getElementById(id) as dialogOrNull;
  dialogHtml?.close();
}
