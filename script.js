'use strict';

// Навігація для смартфонів
const menuButton = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('#main-menu');

function closeMenu() {
  mainMenu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Відкрити меню');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  mainMenu.classList.toggle('is-open', !isOpen);
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Відкрити меню' : 'Закрити меню');
});

mainMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Підстановка обраної процедури у форму запису
const serviceSelect = document.querySelector('#client-service');
const bookingSection = document.querySelector('#booking');

document.querySelectorAll('[data-service]').forEach((button) => {
  button.addEventListener('click', () => {
    serviceSelect.value = button.dataset.service;
    bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Заборона вибору минулих дат (локальна дата відвідувача)
const dateInput = document.querySelector('#client-date');
const today = new Date();
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
dateInput.min = localToday;

// ДЕМОНСТРАЦІЙНА форма: перевіряємо дані, але нікуди їх не надсилаємо.
const form = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  formStatus.textContent = 'Форму заповнено правильно! Це навчальна демонстрація: справжній запис не створено, а дані не передано та не збережено.';
  formStatus.hidden = false;
  form.reset();
  formStatus.focus();
});

// Локальні SVG працюють офлайн; за наявності інтернету замінюємо їх фотографіями.
document.querySelectorAll('img[data-photo]').forEach((image) => {
  const photo = new Image();
  photo.addEventListener('load', () => { image.src = photo.src; });
  photo.src = image.dataset.photo;
});

document.querySelector('#year').textContent = String(new Date().getFullYear());
