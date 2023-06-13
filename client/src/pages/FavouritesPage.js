import FavouritesList from './Favourites.js'
import { Container } from 'react-bootstrap'

const Favourites = () => {
    return (
        <Container>
            <h1>Корзина</h1>
            <FavouritesList />
        </Container>
    )
}

export default Favourites

