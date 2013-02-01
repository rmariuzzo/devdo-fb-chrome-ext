/*!
 * Developers.do Facebook Chrome Extension.
 *
 * Rubens Mariuzzo, 2013.
 */
$(function () {

    // Lookup for code in comments.

    $('.UFICommentBody').each(function () {
        var comment = $(this),
            text = comment.text();

        // Check for `inlined code`.
        if (text.match(/`([^`]+)`/)) {
            comment.find('> span').each(function (i, value) {
                var nodeInComment = $(this),
                    nodeText = nodeInComment.text();
                nodeInComment.html(nodeText.replace(/`([^`]+)`/, function (match, group1) {
                    return '<span class="devdo__inlined_code">' + group1 + '</span>'
                }));
            });
        }

        // Check for {code}block code{code}.
        if (text.match(/{code}.+{code}/)) {

            var opened = false,
                justClosed = false;
                pointer = null, 
                codes = [],
                nodesToRemove = [];

            comment.find('> *').each(function () {

                var nodeInComment = $(this),
                    nodeText = nodeInComment.text();

                if (opened) {

                    if (nodeInComment.is('span')) {
                        codes.push(nodeText);
                        nodesToRemove.push(nodeInComment);
                    } else if (!nodeText.match(/{code:?(.+)?}}/)) {
                        nodeInComment.remove();
                        return true;
                    }
                } 

                if (justClosed && !nodeInComment.is('span')) {
                    justClosed = false;
                    nodeInComment.remove();
                }

                nodeInComment.html(nodeText.replace(/{code:?(.+)?}/, function (tag, lang) {

                    if (opened) {
                        codes.pop();
                        var highlightedCode = lang ? hljs.highlight(lang, codes.join('\n')).value : hljs.highlightAuto(codes.join('\n')).value;
                        pointer.after('<pre class="devdo__block_code">' + highlightedCode + '</pre>');
                        nodesToRemove.forEach(function (n) {
                            n.remove();
                        });
                        codes = [];
                        justClosed = true;
                    } else {
                        pointer = nodeInComment;
                    }

                    opened = !opened;
                    return '';
                }));

            });
        }
    });

});