import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import CommentList from '../CommentList';
import { CSSTransitionGroup } from 'react-transition-group'
import './styles.css';
import {deleteArticle} from '../../AC';
import {connect} from 'react-redux';



class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string
        }).isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    state = {
        updateIndex: 0
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.isOpen !== this.props.isOpen;
    // }

    render() {
        const {article, isOpen, toggleOpen} = this.props;

        return (
            <div ref = {this.setContainerRef}>
                <h3>{article.title}</h3>
                <button className="btn" onClick = {toggleOpen}>
                    {isOpen ? 'close' : 'open'}                
                </button>
                <button onClick = {this.handleDelete}>Delete me</button>
                <CSSTransitionGroup
                    transitionName="article"
                  //  transitionAppear
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={500}
                  //  transitionAppearTimeout={500}
                  //  component = 'div'
                >
                    {this.getBody()}
                </CSSTransitionGroup>
            </div>
        );
    }

    handleDelete = () => {
        const {deleteArticle, article} = this.props; //деструктуризация
        deleteArticle(article.id);
        console.log('----', 'deleting article');
    }

    setContainerRef = ref => {
        this.container = ref;
//        console.log('----', ref);
    }

    getBody() {
        const {article, isOpen} = this.props;
        if (!isOpen) return null;
        return (
                <section>
                    {article.text}
                    <br/>
                    <button onClick = {() => this.setState({updateIndex: this.state.updateIndex + 1})}>update</button>
                    <CommentList article = {article} ref = {this.setCommentsRef} key = {this.state.updateIndex}/>
                </section>
        );
    }

    setCommentsRef = ref => {
  //      console.log('-----', findDOMNode(ref));
    }

  
}

export default connect(null, { deleteArticle })(Article);