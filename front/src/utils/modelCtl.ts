type dialogOrNull = HTMLDialogElement | null;

// Modal操作
export function openModal(id: string) {
  const dialogHtml = document.getElementById(id) as dialogOrNull;
  dialogHtml?.showModal();
}

export function closeModal(id: string) {
  const dialogHtml = document.getElementById(id) as dialogOrNull;
  dialogHtml?.close();
}
