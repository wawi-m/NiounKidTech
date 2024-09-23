// Contact Section
e('section', { className: 'contact-section' },
    e('h2', null, 'Contact Us'),
    e('p', null,
      'Email: ',
      e('a', { href: 'mailto:support@niounkidtech.com' },
        e('i', { className: 'fas fa-envelope' })
      ),
      e('span', null, ' support@niounkidtech.com')
    )
)