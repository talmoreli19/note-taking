const noteInput = document.querySelector('.note-input');
const subjectInput = document.querySelector('.subject-input');
const addButton = document.querySelector('.add-button');
const noteList = document.querySelector('.note-list');
let editingNote = null;


const modal = document.createElement('div');
modal.classList.add('modal');

addButton.addEventListener('click', addNote);
noteInput.addEventListener('keydown', handleEnterKey);

function addNote() {
  const noteText = noteInput.value.trim();
  const subjectText = subjectInput.value.trim();

  if (noteText !== '') {
    const noteItem = document.createElement('li');
    noteItem.classList.add('note-item');

    const noteContent = document.createElement('div');
    noteContent.innerHTML = noteText.replace(/\n/g, '<br>');
    noteContent.classList.add('note-text');
    noteContent.addEventListener('dblclick', () => {
      
      enableInlineEditing(noteContent);
    });

    const noteSubject = document.createElement('span');
    noteSubject.classList.add('subject');
    noteSubject.textContent = `subject: ${subjectText}`;

    const noteDate = document.createElement('span');
    noteDate.classList.add('date');
    noteDate.textContent = getCurrentDateTime();

    noteItem.appendChild(noteContent);
    noteItem.appendChild(noteSubject);
    noteItem.appendChild(noteDate);

    noteList.appendChild(noteItem);
    noteInput.value = '';
    subjectInput.value = '';

   
    showModal('Note submitted successfully');
  }
}

function enableInlineEditing(noteContent) {
  if (editingNote !== null) {

    finishInlineEditing();
  }

  editingNote = noteContent;
  const originalText = noteContent.textContent.replace(/\n/g, '');
  const editableText = document.createElement('textarea');
  editableText.value = originalText;

  noteContent.textContent = '';
  noteContent.appendChild(editableText);
  editableText.focus();

  editableText.addEventListener('blur', () => {

    finishInlineEditing();
  });

  editableText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      finishInlineEditing();
    }
  });
}

function showModal(message) {
  
  const modalContainer = document.querySelector('.modal-container');
  const modal = modalContainer.querySelector('.modal');
  const modalContent = modal.querySelector('p');

  modalContent.textContent = message;
  modalContainer.style.display = 'flex'; 
}

function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.style.display = 'none';
}


function handleEnterKey(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    noteInput.value += '\n';
    adjustTextareaHeight.call(noteInput);
  }
}

function getCurrentDateTime() {
  const now = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return now.toLocaleString('he-IL', options);
}

noteInput.addEventListener('input', adjustTextareaHeight);

function adjustTextareaHeight() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}
