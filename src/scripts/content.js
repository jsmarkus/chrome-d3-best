'use strict';

var $ = require('jquery');

function findNodes() {
    var vrNodes = $('.vote_result');
    var votedNodes = [];
    for (var i = 0; i < vrNodes.length; i++) {
        var node = vrNodes[i];
        var vote = parseInt(node.innerText, 10);
        votedNodes.push({
            vote : vote,
            node : node
        });
    }
    votedNodes.sort(votedNodesComparator);
    return votedNodes;
}

function votedNodesComparator (vn1, vn2) {
    return vn1.vote - vn2.vote;
}

function filterNegative(vnList) {
    var results = [];
    for (var i = 0; i < vnList.length; i++) {
        var votedNode = vnList[i];
        if(votedNode.vote < 0) {
            results.push(votedNode);
        } else {
            break;
        }
    }
    return results;
}

function resolveCommentDetails(votedNode) {
    var $node = $(votedNode.node);
    var $parent = $node.closest('.comment');
    var $body = $parent.find('.c_body:first');
    var $author = $parent.find('.c_user:first');
    var text = $body.text().trim().replace(/\s+/g, ' ');
    var author = $author.text().trim().replace(/\s+/g, ' ');

    var id = $parent.attr('id');

    return {
        id : id,
        text : text,
        author : author,
        vote : votedNode.vote
    };
}

function createCommentBox() {
    var $box = $('#d3best-comments');
    if(!$box.length) {
        $box = $('<div id="d3best-comments">'+
            '</div>');
        bindEvents($box);
        $('body').append($box);
    }
    return $box;
}

function hasFocus($box) {
    return $box.hasClass('state-focus');
}

function setFocus($box) {
    $box.addClass('state-focus');
}

function unsetFocus($box) {
    $box.removeClass('state-focus');
}

function bindEvents ($box) {
    $box.on('click', function (e) {
        if(!hasFocus($box)) {
            setFocus($box);
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    });
    $('body').on('click', ':not(#d3best-comments)',function (e) {
        if($box.is(e.target) || $box.has(e.target).length) {
            return;
        }
        if(hasFocus($box)) {
            debugger
            unsetFocus($box);
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    });
    $box.on('blur', function () {
        $box[0].scrollTop = 0;
    });
}

function renderCommentBox(comments) {
    var $box = createCommentBox();
    $box.empty();
    // $box.append('<div><div class="d3best-icon"></div><h3>Лучшие комментарии:<h3></div>');
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        var $row = renderComment(comment);
        $box.append($row);
    }
    return $box;
}

function renderComment(comment) {
    var $row = $('<a class="d3best-comment d3best-link">');
    var $text = $('<div class="d3best-text">');
    var $author = $('<div class="d3best-author">');
    var $authorName = $('<strong>');
    var $vote = $('<span class="d3best-vote">');
    // var $commentLink = $('<a class="d3best-link">');

    $row.attr('href', '#'+comment.id);
        // .text(comment.text);

    $vote.text(''+comment.vote);
    if(comment.vote < 0) {
        $vote.addClass('d3best-vote-minus');
    } else {
        $vote.addClass('d3best-vote-plus');
    }

    $text.text(comment.text);
    $text.prepend($vote);
    // $text.append($commentLink);

    $authorName.text(comment.author);
    $author.append($authorName);

    $row.append($text);
    $row.append($author);
    return $row;
}

function expandAllCollapsed()
{
    $('.b-comments_collapsed_comments')
        .css('max-height', 'none');

    $('.b-comments_collapsed')
        .addClass('b-comments_collapsed_expanded');
}

function main() {
    renderCommentBox(
        filterNegative(
            findNodes()
        )
        .map(
            resolveCommentDetails
        )
    );
    setTimeout(expandAllCollapsed, 1000);
}

main();
