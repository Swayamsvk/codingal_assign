import React, { Component } from 'react'
import axios from 'axios';


const Show = props => (
    <div>
        <p>userId: {props.post.userId}</p>
        <p>Id: {props.post.Id}</p>
        <p>Title: {props.post.title}</p>
        <p>Body: {props.post.body}</p>
    </div>

)


export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }

    componentDidMount() {
        this.setState({
            loading:true
        })
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({ posts: response.data })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            this.setState({
                loading:false
            })
    }

    postList() {
        return this.state.posts.map(currentpost => {
            return <Show post={currentpost} key={currentpost._id} />;
        })
        console.log(this.state.posts, "these are the posts");
    }

    render() {
        return (
            <div>
              <div>{this.postList()}</div>
              <div>{this.state.loading && 'Loading...'}</div>
            </div>

        )
    }
}

export default Posts
