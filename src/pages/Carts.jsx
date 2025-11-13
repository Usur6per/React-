import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Carts.css'



const Carts = ({ carts, setCarts }) => {
    return (
        <div className='product-container'>
            <h1>cart</h1>
            <div className='item-product-container'>
                {carts.map((cart) => {
                    return (
                        <Card style={{ width: '18rem' }} key={cart.id}>
                            <Card.Img variant="top" src={cart.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>{cart.title}</Card.Title>
                                <Card.Text>
                                    <b>${cart.price.toFixed(2)}</b>
                                </Card.Text>
                                <Button variant="outline-danger" onClick={() => 
                                    setCarts(carts.filter((c) => c.id !== cart.id))}>Remove from carts</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
            <h4> Products: <p className='badge bg-danger'>{carts.length} items</p>  -  Total Price:<p className='badge bg-primary'> ${carts.reduce((prev, cart) => prev + cart.price, 0).toFixed(2)}</p>  </h4>
            <button className='btn btn-warning'>Checkout <i class="bi bi-credit-card-2-back-fill"></i></button>
        </div>
    );
}

export default Carts;