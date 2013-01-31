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
        // Check for `code`...
        if ((text.match(/`/g) || []).length > 1) {
            comment.find(':not(:has(*), :empty)').each(function () {
                var n = $(this),
                    t = n.text(),
                    c = t.match(/`(.+)`/);
                if (c) {
                    n.html(t.replace(/`(.+)`/, '<u>' + c[1] + '</u>'));
                }
            });
        }
    });

});