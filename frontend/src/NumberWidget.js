import Card from 'react-bootstrap/Card'

function NumberWidget(props) {

    /*

            title="Cases" 
              subtitle="People Tested Positive" 
              daily="3"
              sevendays="40"
              trending_number="5"
              trending_percent="30"
              more_better="false"

    */
    return (
        <Card class="border-light bg-light mb-3 p-4">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle>{props.subtitle}</Card.Subtitle>
                <div>Daily</div>
                <div>{props.daily}</div>
                <div>Last 7 Days</div>
                <span>{props.sevendays}</span>
                <span>{props.trending_number} ({props.trending_percent}%)</span>
            </Card.Body>
        </Card>
    );
};

export default NumberWidget;