import React, { useState,useEffect } from 'react'
import '../css/Home.css'
import Cards from './Cards'
import { createSvgIcon } from '@mui/material/utils';



const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com/
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>,
        'Plus',
    );

    const CardList = ({ cards }) => {
        return (
        <div className="card-list">
            {cards.map((card, index) => (
            <Cards key={index} title={card.title} />
            ))}
        </div>
        );
    };

    const CreateCardForm = ({ onCreate }) => {
        const [title, setTitle] = useState('');
        
        const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ title });
        setTitle('');
        };
    
        return (
        <div id='create-new-from-button' onClick={handleSubmit}>
            <PlusIcon/><p>New</p>
        </div>
        );
    };

function Home() {
    const [cards, setCards] = useState([]);
    const [cardCounter, setCardCounter] = useState(1);

    // useEffect(() => {
    //     const storedData = localStorage.getItem('cards');
    //     if (storedData) {
    //     setCards(JSON.parse(storedData));
    //     setCardCounter(JSON.parse(storedData).length + 1);
    //     }
    // }, []);

    const loadCardsFromLocalStorage = () => {
        const storedData = localStorage.getItem('cards');
        if (storedData) {
        setCards(JSON.parse(storedData));
        setCardCounter(JSON.parse(storedData).length);
        }
    };
    // const createCard = () => {
    //     const newCard = {
    //     id: cardCounter,
    //     title: Card${cardCounter},
    //     content: This is content for Card${cardCounter}.
    //     };
    //     setCards([...cards, newCard]);
    //     localStorage.setItem('cards', JSON.stringify([...cards, newCard]));
    //     setCardCounter(cardCounter + 1);
    // };
    const createCard = (title, content) => {
    const newCard = {
        id: cardCounter,
        title,
        content,
        section: 'Not-Started' // Set initial section as 'Not-Started'
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    setCardCounter(cardCounter + 1);
    };      

    const handleDrop = (e, section) => {
    e.preventDefault();
    const cardId = parseInt(e.dataTransfer.getData('text/plain'));
    const updatedCards = cards.map((card) => {
        if (card.id === cardId) {
        return { ...card, section };
        }
        return card;
    });
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    };          

    const handleDropInProgress = (e) => {
        handleDrop(e, 'In-Progress');
    };
    
    const handleDropCompleted = (e) => {
    handleDrop(e, 'Completed');
    };
    
    const handleDropNotStarted = (e) => {
    handleDrop(e, 'Not-Started');
    };      

    const allowDrop = (e) => {
        e.preventDefault();
    };

    const StatusSection = ({ title, section, cards }) => {
        return (
        <div className={section} id='status' onDrop={(e) => handleDrop(e, section)} onDragOver={allowDrop}>
        <div className='Status-top'>
            <div>
            <h4>{title}</h4>
            </div>
            <div>
            <p>icons</p>
            </div>
        </div>
        <CardList cards={cards} />
        </div>
    );
    };

return (
    <div className='Main-Content-Area'>
        <div 
        className='Completed' 
        id='status'
        onDrop={(e) => handleDrop(e, 'Completed')}
        onDragOver={allowDrop}
        >
            <div className='Status-top'>
                <div>
                    <h4>Completed</h4>
                    {cards.length}
                </div>
                <div>
                    <PlusIcon onClick={loadCardsFromLocalStorage}/>
                </div>
            </div>
            <div>
            <CreateCardForm onCreate={createCard} />
            <CardList cards={cards} />
            <CardList cards={cards.filter((card) => card.section === 'Completed')} />            
            </div>
            <StatusSection id="status" className="Not-Started" title="Not Started" section="Not-Started" cards={cards.filter((card) => card.section === 'Not-Started')} />
            <StatusSection id="status" className="In-Progress" title="In Progress" section="In-Progress" cards={cards.filter((card) => card.section === 'In-Progress')} />
            <StatusSection id="status" className="Completed" title="Completed" section="Completed" cards={cards.filter((card) => card.section === 'Completed')} />
        </div>
    </div>
)
}

export default Home