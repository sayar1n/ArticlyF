# Использование модального окна

Для подключения использовать:

    "use client"; # Вставить на страницы, где будет использоваться внедрение
    import React, { useState } from 'react';
    import Modal from '@/components/modal/Modal';


Вставить перед return для работы:

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

Внедрение в структуру страницы:

    <button onClick={openModal}></button>
    <Modal isOpen={isModalOpen} onClose={closeModal}>
        <{Ваша страница с модулем} />
    </Modal>