'use strict';

// Shared header content: edit here to update navigation on every page.
const headerContent = {
  name: ['SHREE KRISHNA', 'RASAPAAKA GRAND'],
  logo: 'assets/img/logo-hd.png',
  phone: '+919019975769',
  links: [
    { label: 'Home', href: 'index.html' },
    { label: 'Our Story', href: 'index.html#about' },
    { label: 'Food & Menu', href: 'menu.html' },
    { label: 'Gallery', href: 'gallery.html' },
    { label: 'Visit Us', href: 'visit.html' }
  ]
};

const siteHeader = document.getElementById('siteHeader');
if (siteHeader) {
  const page = location.pathname.split('/').pop() || 'index.html';
  siteHeader.innerHTML = `
    <nav class="navbar navbar-expand-xl" aria-label="Main navigation">
      <div class="container header-container">
        <a class="brand header-brand" href="index.html" aria-label="${headerContent.name.join(' ')} — Home">
          <img class="brand-logo" src="${headerContent.logo}" width="80" height="80" alt="" fetchpriority="high">
          <span>${headerContent.name[0]}</span>
          <strong>${headerContent.name[1]}</strong>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <div class="collapse navbar-collapse" id="navigation">
          <ul class="navbar-nav ms-auto align-items-xl-center">
            ${headerContent.links.map(link => {
              const active = link.href === page;
              return `<li class="nav-item"><a class="nav-link${active ? ' active' : ''}" href="${link.href}"${active ? ' aria-current="page"' : ''}>${link.label}</a></li>`;
            }).join('')}
            <li class="nav-item"><a class="btn btn-gold nav-call" href="tel:${headerContent.phone}">Call the Restaurant <span aria-hidden="true">↗</span></a></li>
          </ul>
        </div>
      </div>
    </nav>`;

  const navigation = document.getElementById('navigation');
  const toggle = siteHeader.querySelector('.navbar-toggler');
  const collapse = bootstrap.Collapse.getOrCreateInstance(navigation, { toggle: false });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (!matchMedia('(min-width: 1200px)').matches) collapse.hide();
  }));
  siteHeader.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('show')) {
      collapse.hide();
      toggle.focus();
    }
  });
  navigation.addEventListener('show.bs.collapse', () => siteHeader.classList.add('menu-open'));
  navigation.addEventListener('hidden.bs.collapse', () => siteHeader.classList.remove('menu-open'));
  matchMedia('(min-width: 1200px)').addEventListener('change', event => {
    if (event.matches) collapse.hide();
  });
  const updateScroll = () => siteHeader.classList.toggle('is-scrolled', scrollY > 32);
  addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
}
