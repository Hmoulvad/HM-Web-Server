import * as React from 'react';
import LayoutContainer from '../../layout';

const Home: React.FunctionComponent<any> = (props) => {

    const sendMessageToRN = () => {
        window.postMessage("HEY","*");
    }

    return (
        <LayoutContainer>
            <h3 className="home__header">Welcome to IMPACT’s Holiday Manager</h3>
            <p className="home__description"> 
                You could see there was text coming out of her eyes, 
                text coming out of her wherever. My placeholder text, I think, 
                is going to end up being very good with women. The other thing with 
                Lorem Ipsum is that you have to take out its family. When other websites give you text, 
                they’re not sending the best. They’re not sending you, they’re sending words that have 
                lots of problems and they’re bringing those problems with us. They’re bringing mistakes. 
                They’re bringing misspellings. They’re typists… And some, I assume, are good words.
            </p>
            <button onClick={sendMessageToRN}>Message To ReactNative</button>
        </LayoutContainer>
)
};

export default Home;