type dialogOrNull = HTMLDialogElement | null;

export function openModal(id: string) {
  const dialogHtml = document.getElementById(id) as dialogOrNull;
  dialogHtml?.showModal();
}