(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@beanbag/spina'), require('@beanbag/ink'), require('underscore')) :
    typeof define === 'function' && define.amd ? define(['exports', '@beanbag/spina', '@beanbag/ink', 'underscore'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.RB = global.RB || {}, global.Spina, global.Ink, global._));
})(this, (function (exports, spina, ink, _$1) { 'use strict';

    var _class$L;

    /**
     * Serialized information about a FileDiff.
     *
     * Version Added:
     *     7.0
     */

    /** The set of serialized comment blocks in the diff. */

    /**
     * Attributes for the DiffFile model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Serialized resource data as returned from the server.
     *
     * Version Added:
     *     7.0
     */

    /**
     * A model for a single file in a diff.
     */
    let DiffFile = spina.spina(_class$L = class DiffFile extends spina.BaseModel {
      static defaults = {
        baseFileDiffID: null,
        binary: false,
        deleted: false,
        filediff: null,
        forceInterdiff: null,
        forceInterdiffRevision: null,
        index: null,
        interfilediff: null,
        modifiedFilename: null,
        modifiedRevision: null,
        newfile: false,
        origFilename: null,
        origRevision: null,
        public: false,
        serializedCommentBlocks: null
      };

      /**
       * Parse the response into model attributes.
       *
       * Args:
       *     rsp (object):
       *         The response from the server.
       *
       * Returns:
       *     object:
       *     The model attributes.
       */
      parse(rsp) {
        return {
          baseFileDiffID: rsp.base_filediff_id,
          binary: rsp.binary,
          deleted: rsp.deleted,
          filediff: rsp.filediff,
          forceInterdiff: rsp.force_interdiff,
          forceInterdiffRevision: rsp.interdiff_revision,
          id: rsp.id,
          index: rsp.index,
          interfilediff: rsp.interfilediff,
          modifiedFilename: rsp.modified_filename,
          modifiedRevision: rsp.modified_revision,
          newfile: rsp.newfile,
          origFilename: rsp.orig_filename,
          origRevision: rsp.orig_revision,
          public: rsp.public,
          serializedCommentBlocks: rsp.serialized_comment_blocks
        };
      }
    }) || _class$L;

    var _class$K;

    /**
     * A collection of files.
     */
    let DiffFileCollection = spina.spina(_class$K = class DiffFileCollection extends spina.BaseCollection {
      static model = DiffFile;
    }) || _class$K;

    var _dec$a, _class$J;

    /**
     * The serialized comment block type.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Attributes for the AbstractReviewable model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Abstract model for reviewable content.
     *
     * This is the basis for subclasses that handle review capabilities for
     * some form of content, such as a file attachment.
     *
     * All subclasses must provide a 'commentBlockModel' object type and an
     * loadSerializedCommentBlock() function.
     */
    let AbstractReviewable = (_dec$a = spina.spina({
      prototypeAttrs: ['commentBlockModel', 'defaultCommentBlockFields']
    }), _dec$a(_class$J = class AbstractReviewable extends spina.BaseModel {
      static defaults() {
        return {
          caption: null,
          renderedInline: false,
          review: null,
          reviewRequest: null,
          serializedCommentBlocks: {}
        };
      }

      /**
       * The list of fields from this model to populate in each new instance
       * of a commentBlockModel.
       *
       * This can also be a function, if anything more custom is required.
       */
      static defaultCommentBlockFields = [];

      /**********************
       * Instance variables *
       **********************/

      /**
       * The AbstractCommentBlock subclass for this content type's comment
       * blocks.
       */
      static commentBlockModel = null;

      /**
       * The collection of comment blocks.
       */

      /**
       * Initialize the reviewable.
       */
      initialize() {
        const reviewRequest = this.get('reviewRequest');
        console.assert(!!this.commentBlockModel, "'commentBlockModel' must be defined in the " + "reviewable's object definition");
        console.assert(!!reviewRequest, '"reviewRequest" must be provided when constructing ' + 'the reviewable');
        if (!this.get('review')) {
          this.set('review', reviewRequest.createReview());
        }
        this.commentBlocks = new spina.Collection([], {
          model: this.commentBlockModel
        });

        /*
         * Add all existing comment regions to the page.
         *
         * This intentionally doesn't use forEach because some review UIs (such
         * as the image review UI) return their serialized comments as an
         * object instead of an array.
         */
        const commentBlocks = this.get('serializedCommentBlocks');
        if (commentBlocks !== null) {
          for (const comments of Object.values(commentBlocks)) {
            if (comments.length) {
              this.loadSerializedCommentBlock(comments);
            }
          }
        }
      }

      /**
       * Create a CommentBlock for this reviewable.
       *
       * The CommentBlock will be stored in the list of comment blocks.
       *
       * Args:
       *     attrs (object):
       *         The attributes for the comment block;
       */
      createCommentBlock(attrs) {
        this.commentBlocks.add(_.defaults({
          review: this.get('review'),
          reviewRequest: this.get('reviewRequest')
        }, attrs));
      }

      /**
       * Load a serialized comment and add comment blocks for it.
       *
       * This should parse the serializedCommentBlock and add one or more
       * comment blocks (using createCommentBlock).
       *
       * This must be implemented by subclasses.
       *
       * Args:
       *     serializedComments (Array of SerializedComment):
       *         The serialized data for the new comment block(s).
       */
      loadSerializedCommentBlock(serializedComments) {
        console.assert(false, 'loadSerializedCommentBlock must be ' + 'implemented by a subclass');
      }
    }) || _class$J);

    var _dec$9, _class$I;

    /**
     * Attributes for the AbstractCommentBlock model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Represents a region of reviewable content that contains comments.
     *
     * This stores all comments that match a given region, as defined by a
     * subclass of AbstractCommentBlock.
     *
     * New draft comments can be created, which will later be stored on the
     * server.
     *
     * The total number of comments in the block (including any draft comment)
     * will be stored, which may be useful for display.
     */
    let AbstractCommentBlock = (_dec$9 = spina.spina({
      prototypeAttrs: ['serializedFields']
    }), _dec$9(_class$I = class AbstractCommentBlock extends spina.BaseModel {
      /** Default values for the model attributes. */
      static defaults() {
        return {
          canDelete: false,
          count: 0,
          draftComment: null,
          hasDraft: false,
          review: null,
          reviewRequest: null,
          serializedComments: []
        };
      }

      /**
       * The list of extra fields on this model.
       *
       * These will be stored on the server in the comment's extra_data field.
       */
      static serializedFields = [];

      /**
       * Initialize the AbstractCommentBlock.
       */
      initialize() {
        console.assert(!!this.get('reviewRequest'), 'reviewRequest must be provided');
        console.assert(!!this.get('review'), 'review must be provided');

        /*
         * Find out if there are any draft comments and filter them out of the
         * stored list of comments.
         */
        const comments = this.get('serializedComments');
        const newSerializedComments = [];
        if (comments.length > 0) {
          comments.forEach(comment => {
            // We load in encoded text, so decode it.
            comment.text = $('<div>').html(comment.text).text();
            if (comment.localdraft) {
              this.ensureDraftComment(comment.comment_id, {
                html: comment.html,
                issueOpened: comment.issue_opened,
                issueStatus: comment.issue_status,
                richText: comment.rich_text,
                text: comment.text
              });
            } else {
              newSerializedComments.push(comment);
            }
          }, this);
          this.set('serializedComments', newSerializedComments);
        } else {
          this.ensureDraftComment();
        }
        this.on('change:draftComment', this._updateCount, this);
        this._updateCount();
      }

      /**
       * Return whether or not the comment block is empty.
       *
       * A comment block is empty if there are no stored comments and no
       * draft comment.
       *
       * Returns:
       *     boolean:
       *     Whether the comment block is empty.
       */
      isEmpty() {
        return this.get('serializedComments').length === 0 && !this.has('draftComment');
      }

      /**
       * Create a draft comment, optionally with a given ID and text.
       *
       * This must be implemented by a subclass to return a Comment class
       * specific to the subclass.
       *
       * Args:
       *     id (number):
       *         The ID of the comment to instantiate the model for.
       *
       * Returns:
       *     RB.BaseComment:
       *     The new comment model.
       */
      createComment(id) {
        console.assert(false, 'This must be implemented by a subclass');
        return null;
      }

      /**
       * Create a draft comment in this comment block.
       *
       * Only one draft comment can exist per block, so if one already exists,
       * this will do nothing.
       *
       * The actual comment object is up to the subclass to create.
       *
       * Args:
       *     id (number):
       *         The ID of the comment.
       *
       *     comment_attr (object):
       *         Attributes to set on the comment model.
       */
      ensureDraftComment(id, comment_attr) {
        if (this.has('draftComment')) {
          return;
        }
        const comment = this.createComment(id);
        comment.set(comment_attr);
        comment.on('saved', this._updateCount, this);
        comment.on('destroy', () => {
          this.set('draftComment', null);
          this._updateCount();
        });
        this.set('draftComment', comment);
      }

      /**
       * Update the displayed number of comments in the comment block.
       *
       * If there's a draft comment, it will be added to the count. Otherwise,
       * this depends solely on the number of published comments.
       */
      _updateCount() {
        let count = this.get('serializedComments').length;
        if (this.has('draftComment')) {
          count++;
        }
        this.set('count', count);
      }

      /**
       * Return a warning about commenting on a deleted object.
       *
       * Version Added:
       *     6.0
       *
       * Returns:
       *     string:
       *     A warning to display to the user if they're commenting on a deleted
       *     object. Return null if there's no warning.
       */
      getDeletedWarning() {
        return null;
      }

      /**
       * Return a warning about commenting on a draft object.
       *
       * Returns:
       *     string:
       *     A warning to display to the user if they're commenting on a draft
       *     object. Return null if there's no warning.
       */
      getDraftWarning() {
        return null;
      }
    }) || _class$I);

    var _class$H;

    /**
     * Attributes for the DiffCommentBlock model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Represents the comments on a region of a diff.
     *
     * DiffCommentBlock deals with creating and representing comments that exist
     * in a specific line range of a diff.
     *
     * See Also:
     *     :js:class:`RB.AbstractCommentBlock`:
     *         For the attributes defined by the base model.
     */
    let DiffCommentBlock = spina.spina(_class$H = class DiffCommentBlock extends AbstractCommentBlock {
      /** Default values for the model attributes. */
      static defaults = {
        $beginRow: null,
        $endRow: null,
        baseFileDiffID: null,
        beginLineNum: null,
        endLineNum: null,
        fileDiffID: null,
        interFileDiffID: null,
        public: false
      };
      static serializedFields = ['line', 'num_lines'];

      /**
       * Return the number of lines this comment block spans.
       *
       * Returns:
       *     number:
       *     The number of lines spanned by this comment.
       */
      getNumLines() {
        return this.get('endLineNum') + this.get('beginLineNum') + 1;
      }

      /**
       * Create a DiffComment for the given comment ID.
       *
       * Args:
       *     id (number):
       *         The ID of the comment to instantiate the model for.
       *
       * Returns:
       *     RB.DiffComment:
       *     The new comment model.
       */
      createComment(id) {
        return this.get('review').createDiffComment({
          baseFileDiffID: this.get('baseFileDiffID'),
          beginLineNum: this.get('beginLineNum'),
          endLineNum: this.get('endLineNum'),
          fileDiffID: this.get('fileDiffID'),
          id: id,
          interFileDiffID: this.get('interFileDiffID')
        });
      }

      /**
       * Return a warning about commenting on a draft object.
       *
       * Returns:
       *     string:
       *     A warning to display to the user if they're commenting on a draft
       *     object. Return null if there's no warning.
       */
      getDraftWarning() {
        if (this.get('public')) {
          return null;
        } else {
          return gettext("The diff for this comment is still a draft. Replacing the draft diff will delete this comment.");
        }
      }
    }) || _class$H;

    var _class$G;

    /**
     * Attributes for the DiffReviewable model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Provides state and utility functions for loading and reviewing diffs.
     *
     * See Also:
     *     :js:class:`RB.AbstractReviewable`:
     *         For the attributes defined by the base model.
     */
    let DiffReviewable = spina.spina(_class$G = class DiffReviewable extends AbstractReviewable {
      static defaults = {
        baseFileDiffID: null,
        file: null,
        fileDiffID: null,
        interFileDiffID: null,
        interdiffRevision: null,
        public: false,
        revision: null
      };
      static commentBlockModel = DiffCommentBlock;
      static defaultCommentBlockFields = ['baseFileDiffID', 'fileDiffID', 'interFileDiffID', 'public'];

      /**
       * Load a serialized comment and add comment blocks for it.
       *
       * Args:
       *     serializedCommentBlock (object):
       *         The serialized data for the new comment block(s).
       */
      loadSerializedCommentBlock(serializedComments) {
        const parsedData = this.commentBlockModel.prototype.parse(_.pick(serializedComments[0], this.commentBlockModel.prototype.serializedFields));
        const line = parsedData['line'];
        const numLines = parsedData['num_lines'];
        this.createCommentBlock({
          beginLineNum: line,
          endLineNum: line + numLines - 1,
          fileDiffID: this.get('fileDiffID'),
          interFileDiffID: this.get('interFileDiffID'),
          public: this.get('public'),
          review: this.get('review'),
          reviewRequest: this.get('reviewRequest'),
          serializedComments: serializedComments
        });
      }

      /**
       * Return the rendered diff for a file.
       *
       * The rendered file will be fetched from the server and eventually
       * returned through the promise.
       *
       * Version Changed:
       *     7.0:
       *     Removed old callbacks-style invocation.
       *
       * Version Changed:
       *     5.0:
       *     Deprecated callbacks and added a promise return value.
       *
       * Args:
       *     options (object, optional):
       *         The option arguments that control the behavior of this function.
       *
       * Option Args:
       *     showDeleted (boolean):
       *         Determines whether or not we want to requeue the corresponding
       *         diff in order to show its deleted content.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      getRenderedDiff(options = {}) {
        return this._fetchFragment({
          noActivityIndicator: true,
          url: this._buildRenderedDiffURL({
            index: this.get('file').get('index'),
            showDeleted: options.showDeleted
          })
        });
      }

      /**
       * Return a rendered fragment of a diff.
       *
       * The fragment will be fetched from the server and eventually returned
       * through the promise.
       *
       * Version Changed:
       *     7.0:
       *     Removed old callbacks-style invocation.
       *
       * Version Changed:
       *     5.0:
       *     Deprecated callbacks and added a promise return value.
       *
       * Args:
       *     options (object):
       *         The option arguments that control the behavior of this function.
       *
       * Option Args:
       *     chunkIndex (number):
       *         The chunk index to load.
       *
       *     linesOfContext (number):
       *         The number of additional lines of context to include.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      getRenderedDiffFragment(options) {
        console.assert(options.chunkIndex !== undefined, 'chunkIndex must be provided');
        return this._fetchFragment({
          url: this._buildRenderedDiffURL({
            chunkIndex: options.chunkIndex,
            index: this.get('file').get('index'),
            linesOfContext: options.linesOfContext
          })
        });
      }

      /**
       * Fetch the diff fragment from the server.
       *
       * This is used internally by getRenderedDiff and getRenderedDiffFragment
       * to do all the actual fetching.
       *
       * Args:
       *     options (object):
       *         The option arguments that control the behavior of this function.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      _fetchFragment(options // TODO TYPING: convert once RB.apiCall has an interface
      ) {
        return new Promise(resolve => {
          RB.apiCall(_.defaults({
            complete: xhr => resolve(xhr.responseText),
            dataType: 'html',
            type: 'GET'
          }, options));
        });
      }

      /**
       * Return a URL that forms the base of a diff fragment fetch.
       *
       * Args:
       *     options (object):
       *         Options for the URL.
       *
       * Option Args:
       *     chunkIndex (number, optional):
       *         The chunk index to load.
       *
       *     index (number, optional):
       *         The file index to load.
       *
       *     linesOfContext (number, optional):
       *         The number of lines of context to load.
       *
       *     showDeleted (boolean, optional):
       *         Whether to show deleted content.
       *
       * Returns:
       *     string:
       *     The URL for fetching diff fragments.
       */
      _buildRenderedDiffURL(options = {}) {
        const reviewURL = this.get('reviewRequest').get('reviewURL');
        const interdiffRevision = this.get('interdiffRevision');
        const fileDiffID = this.get('fileDiffID');
        const interFileDiffID = this.get('interFileDiffID');
        const baseFileDiffID = this.get('baseFileDiffID');
        const revision = this.get('revision');
        const revisionPart = interdiffRevision ? `${revision}-${interdiffRevision}` : revision;
        const fileDiffPart = interFileDiffID ? `${fileDiffID}-${interFileDiffID}` : fileDiffID;
        let url = `${reviewURL}diff/${revisionPart}/fragment/${fileDiffPart}/`;
        if (options.chunkIndex !== undefined) {
          url += `chunk/${options.chunkIndex}/`;
        }

        /* Build the query string. */
        const queryParts = [];
        if (baseFileDiffID) {
          queryParts.push(`base-filediff-id=${baseFileDiffID}`);
        }
        if (options.index !== undefined) {
          queryParts.push(`index=${options.index}`);
        }
        if (options.linesOfContext !== undefined) {
          queryParts.push(`lines-of-context=${options.linesOfContext}`);
        }
        if (options.showDeleted) {
          queryParts.push(`show-deleted=1`);
        }
        queryParts.push(`_=${TEMPLATE_SERIAL}`);
        const queryStr = queryParts.join('&');
        return `${url}?${queryStr}`;
      }
    }) || _class$G;

    var _class$F;

    /**
     * Options for the DiffReviewableCollection.
     *
     * Version Added:
     *     7.0
     */

    /**
     * A collection of RB.DiffReviewable instances.
     *
     * This manages a collection of :js:class:`RB.DiffReviewable`s and can
     * populate itself based on changes to a collection of files.
     *
     * When repopulating, this will emit a ``populating`` event. After populating,
     * it will emit a ``populated`` event.
     */
    let DiffReviewableCollection = spina.spina(_class$F = class DiffReviewableCollection extends spina.BaseCollection {
      static model = DiffReviewable;

      /**********************
       * Instance variables *
       **********************/

      /** The review request. */

      /**
       * Initialize the collection.
       *
       * Args:
       *     models (Array):
       *         Optional array of models.
       *
       *     options (object):
       *         Options for the collection.
       *
       * Option Args:
       *     reviewRequest (RB.ReviewRequest):
       *         The review request for the collection. This must be provided.
       */
      initialize(models, options) {
        super.initialize(models, options);
        this.reviewRequest = options.reviewRequest;
      }

      /**
       * Watch for changes to a collection of files.
       *
       * When the files change (and when invoking this method), this collection
       * will be rebuilt based on those files.
       *
       * Args:
       *     files (RB.DiffFileCollection):
       *         The collection of files to watch.
       */
      watchFiles(files) {
        this.listenTo(files, 'reset', () => this._populateFromFiles(files));
        this._populateFromFiles(files);
      }

      /**
       * Populate this collection from a collection of files.
       *
       * This will clear this collection and then loop through each file,
       * adding a corresponding :js:class:`RB.DiffReviewable`.
       *
       * After clearing, but prior to adding any entries, this will emit a
       * ``populating`` event. After all reviewables have been added, this
       * will emit a ``populated`` event.
       *
       * Args:
       *     files (RB.DiffFileCollection):
       *         The collection of files to populate from.
       */
      _populateFromFiles(files) {
        const reviewRequest = this.reviewRequest;
        console.assert(!!reviewRequest, 'RB.DiffReviewableCollection.reviewRequest must be set');
        this.reset();
        this.trigger('populating');
        files.each(file => {
          const filediff = file.get('filediff');
          const interfilediff = file.get('interfilediff');
          let interdiffRevision = null;
          if (interfilediff) {
            interdiffRevision = interfilediff.revision;
          } else if (file.get('forceInterdiff')) {
            interdiffRevision = file.get('forceInterdiffRevision');
          }
          this.add({
            baseFileDiffID: file.get('baseFileDiffID'),
            file: file,
            fileDiffID: filediff.id,
            interFileDiffID: interfilediff ? interfilediff.id : null,
            interdiffRevision: interdiffRevision,
            public: file.get('public'),
            reviewRequest: reviewRequest,
            revision: filediff.revision,
            serializedCommentBlocks: file.get('serializedCommentBlocks')
          });
        });
        this.trigger('populated');
      }
    }) || _class$F;

    var _dec$8, _class$E;


    /**
     * Attributes for the CommentEditor model.
     */

    /**
     * Represents the state for editing a new or existing draft comment.
     *
     * From here, a comment can be created, edited, or deleted.
     *
     * This will provide state on what actions are available on a comment,
     * informative text, dirty states, existing published comments on the
     * same region this comment is on, and more.
     */
    let CommentEditor = (_dec$8 = spina.spina({
      mixins: [RB.ExtraDataMixin]
    }), _dec$8(_class$E = class CommentEditor extends spina.BaseModel {
      /**
       * Return the default values for the model attributes.
       *
       * Returns:
       *     CommentEditorAttrs:
       *     The default values for the attributes.
       */
      static defaults() {
        const userSession = RB.UserSession.instance;
        return {
          canDelete: false,
          canEdit: undefined,
          canSave: false,
          comment: null,
          dirty: false,
          editing: false,
          extraData: {},
          openIssue: userSession.get('commentsOpenAnIssue'),
          publishedComments: [],
          publishedCommentsType: null,
          requireVerification: false,
          // TODO: add a user preference for this
          reviewRequest: null,
          reviewRequestEditor: null,
          richText: userSession.get('defaultUseRichText'),
          text: ''
        };
      }

      /**
       * Initialize the comment editor.
       */
      initialize() {
        this.listenTo(this, 'change:comment', this.#updateFromComment);
        this.#updateFromComment();

        /*
         * Unless a canEdit value is explicitly given, we want to compute
         * the proper state.
         */
        if (this.get('canEdit') === undefined) {
          this.#updateCanEdit();
        }
        this.listenTo(this, 'change:dirty', (model, dirty) => {
          const reviewRequestEditor = this.get('reviewRequestEditor');
          if (reviewRequestEditor) {
            if (dirty) {
              reviewRequestEditor.incr('editCount');
            } else {
              reviewRequestEditor.decr('editCount');
            }
          }
        });
        this.listenTo(this, 'change:openIssue change:requireVerification change:richText ' + 'change:text', () => {
          if (this.get('editing')) {
            this.set('dirty', true);
            this.#updateState();
          }
        });
        this.#updateState();
        this._setupExtraData();
      }

      /**
       * Set the editor to begin editing a new or existing comment.
       */
      beginEdit() {
        console.assert(this.get('canEdit'), 'beginEdit() called when canEdit is false.');
        console.assert(this.get('comment'), 'beginEdit() called when no comment was first set.');
        this.set({
          dirty: false,
          editing: true
        });
        this.#updateState();
      }

      /**
       * Delete the current comment, if it can be deleted.
       *
       * This requires that there's a saved comment to delete.
       *
       * The editor will be marked as closed, requiring a new call to beginEdit.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      async deleteComment() {
        console.assert(this.get('canDelete'), 'deleteComment() called when canDelete is false.');
        const comment = this.get('comment');
        await comment.destroy();
        this.trigger('deleted');
        this.close();
      }

      /**
       * Cancel editing of a comment.
       *
       * If there's a saved comment and it's been made empty, it will end
       * up being deleted. Then this editor will be marked as closed,
       * requiring a new call to beginEdit.
       */
      cancel() {
        this.stopListening(this, 'change:comment');
        const comment = this.get('comment');
        if (comment) {
          comment.destroyIfEmpty();
          this.trigger('canceled');
        }
        this.close();
      }

      /**
       * Close editing of the comment.
       *
       * The comment state will be reset, and the "closed" event will be
       * triggered.
       *
       * To edit a comment again after closing it, the proper state must be
       * set again and beginEdit must be called.
       */
      close() {
        /* Set this first, to prevent dirty firing. */
        this.set('editing', false);
        this.set({
          comment: null,
          dirty: false,
          extraData: new RB.ExtraData(),
          text: ''
        });
        this.trigger('closed');
      }

      /**
       * Save the comment.
       *
       * If this is a new comment, it will be created on the server.
       * Otherwise, the existing comment will be updated.
       *
       * The editor will not automatically be marked as closed. That is up
       * to the caller.
       *
       * Version Changed:
       *     5.0:
       *     Deprecated callbacks and added a promise return value.
       *
       * Args:
       *     options (object, optional):
       *         Options for the save operation.
       *
       *     context (object, optional):
       *         The context to use when calling callbacks.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      async save(options = {}, context = undefined) {
        if (_.isFunction(options.success) || _.isFunction(options.error) || _.isFunction(options.complete)) {
          console.warn('RB.CommentEditor.save was called using ' + 'callbacks. Callers should be updated to use ' + 'promises instead.');
          return RB.promiseToCallbacks(options, context, newOptions => this.save(newOptions));
        }
        console.assert(this.get('canSave'), 'save() called when canSave is false.');
        const extraData = _.clone(this.get('extraData'));
        extraData.require_verification = this.get('requireVerification');
        const comment = this.get('comment');
        comment.set({
          extraData: extraData,
          includeTextTypes: 'html,raw,markdown',
          issueOpened: this.get('openIssue'),
          richText: this.get('richText'),
          text: this.get('text')
        });
        await comment.save();
        this.set('dirty', false);
        this.trigger('saved');
      }

      /**
       * Update the state of the editor from the currently set comment.
       */
      async #updateFromComment() {
        const oldComment = this.previous('comment');
        const comment = this.get('comment');
        if (oldComment) {
          oldComment.destroyIfEmpty();
        }
        if (comment) {
          const defaults = _.result(this, 'defaults');
          const defaultRichText = defaults.richText;

          /*
           * Set the attributes based on what we know at page load time.
           *
           * Note that it is *possible* that the comments will have changed
           * server-side since loading the page (if the user is reviewing
           * the same diff in two tabs). However, it's unlikely.
           *
           * Doing this before the ready() call ensures that we'll have the
           * text and state up-front and that it won't overwrite what the
           * user has typed after load.
           *
           * Note also that we'll always want to use our default richText
           * value if it's true, and we'll fall back on the comment's value
           * if false. This is so that we can keep a consistent experience
           * when the "Always edit Markdown by default" value is set.
           */
          this.set({
            dirty: false,
            extraData: comment.get('extraData'),
            openIssue: comment.get('issueOpened') === null ? defaults.openIssue : comment.get('issueOpened'),
            requireVerification: comment.requiresVerification(),
            richText: defaultRichText || !!comment.get('richText')
          });

          /*
           * We'll try to set the one from the appropriate text fields, if it
           * exists and is not empty. If we have this, then it came from a
           * previous save. If we don't have it, we'll fall back to "text",
           * which should be normalized content from the initial page load.
           */
          const textFields = comment.get('richText') || !defaultRichText ? comment.get('rawTextFields') : comment.get('markdownTextFields');
          this.set('text', !_.isEmpty(textFields) ? textFields.text : comment.get('text'));
          await comment.ready();
          this.#updateState();
        }
      }

      /**
       * Update the canEdit state of the editor.
       *
       * This is based on the authentication state of the user, and
       * whether or not there's an existing draft for the review request.
       */
      #updateCanEdit() {
        const userSession = RB.UserSession.instance;
        this.set('canEdit', userSession.get('authenticated') && !userSession.get('readOnly'));
      }

      /**
       * Update the capability states of the editor.
       *
       * Some of the can* properties will change to reflect the various
       * actions that can be performed with the editor.
       */
      #updateState() {
        const canEdit = this.get('canEdit');
        const editing = this.get('editing');
        const comment = this.get('comment');
        this.set({
          canDelete: canEdit && editing && comment && !comment.isNew(),
          canSave: canEdit && editing && this.get('text') !== ''
        });
      }
    }) || _class$E);

    var _class$D;
    /**
     * Comment types supported by CommentIssueManager.
     *
     * The values should be considered opaque. Callers should use the constants
     * instead.
     *
     * These are only used for functionality in this model and objects
     * interfacing with this model. They should not be used as generic
     * indicators for model classes.
     *
     * Version Added:
     *     7.0
     */
    let CommentIssueManagerCommentType = /*#__PURE__*/function (CommentIssueManagerCommentType) {
      CommentIssueManagerCommentType["DIFF"] = "diff_comments";
      CommentIssueManagerCommentType["FILE_ATTACHMENT"] = "file_attachment_comments";
      CommentIssueManagerCommentType["GENERAL"] = "general_comments";
      CommentIssueManagerCommentType["SCREENSHOT"] = "screenshot_comments";
      return CommentIssueManagerCommentType;
    }({});

    /*
     * NOTE: Ideally, we'd have a mapping of the types above to the resource
     *       classes, so that we can automatically infer the right type down
     *       below in getOrCreateComment.
     *
     *       As of this writing (April 7, 2024 -- Review Board 7), we don't
     *       have newer-style classes yet for these comment types, so we can't
     *       actually do this.
     *
     *       This code is being left here for a future implementation, as a
     *       reminder and an exercise to a future developer to address this.
     */
    /*
    type CommentIssueManagerCommentClasses = {
        [CommentIssueManagerCommentType.DIFF]: DiffComment,
        [CommentIssueManagerCommentType.FILE_ATTACHMENT]: FileAttachmentComment,
        [CommentIssueManagerCommentType.GENERAL]: GeneralComment,
        [CommentIssueManagerCommentType.SCREENSHOT]: ScreenshotComment,
    };
    */

    /**
     * Options for CommentIssueManager.getOrCreateComment().
     *
     * Version Added:
     *     7.0
     */

    /**
     * Options for setting the issue status of a comment.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Attributes for configuring the manager.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Event data for an issueStatusUpdated-like event.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Manages issue states for comments on a review request.
     *
     * CommentIssueManager takes care of setting the state of a particular
     * comment issue, and also takes care of notifying callbacks whenever
     * the state is successfully changed.
     *
     * Events:
     *     anyIssueStatusUpdated:
     *         The issue status of a comment has changed.
     *
     *         This can be used to listen to changes to any comment tracked
     *         by this manager.
     *
     *         Version Added:
     *             7.0
     *
     *         Args:
     *             eventData (object):
     *                 Data on the event.
     *
     *                 See :js:class:`IssueStatusUpdatedEventData` for details.
     *
     *     issueStatusUpdated:{comment_type}:{comment_id}:
     *         The issue status of a specific comment has changed.
     *
     *         This can be used to listen to changes to a specified comment tracked
     *         by this manager. Callers should form the event type by using
     *         the string value of a :js:class:`CommentIssueManagerCommentType`
     *         enum and of the comment ID.
     *
     *         Version Added:
     *             7.0
     *
     *         Args:
     *             eventData (object):
     *                 Data on the event.
     *
     *                 See :js:class:`IssueStatusUpdatedEventData` for details.
     *
     *     issueStatusUpdated:
     *         The issue status of a comment has changed.
     *
     *         Deprecated:
     *             7.0:
     *             Callers should use ``anyIssueStatusUpdated`` or
     *             :samp:`issueStatusUpdated:{comment_type}:{comment_id}` instead.
     *
     *         Args:
     *             comment (RB.BaseComment):
     *                 The comment that changed.
     *
     *             oldIssueStatus (string):
     *                 The old issue status.
     *
     *             timestamp (string):
     *                 The latest timestamp for the comment.
     *
     *             commentType (string):
     *                 The comment type identifier (one of
     *                 :js:attr:`RB.CommentIssueManager.CommentTypes`).
     *
     *                 Version Added:
     *                     4.0.8
     */
    let CommentIssueManager = spina.spina(_class$D = class CommentIssueManager extends spina.BaseModel {
      static defaults = {
        reviewRequest: null
      };

      /**
       * Deprecated mapping of comment type constants to values.
       *
       * Callers should use :js:class:`CommentIssueManagerCommentType` instead.
       *
       * Deprecated:
       *     7.0
       *
       * Version Added:
       *     4.0.8
       */
      static CommentTypes = CommentIssueManagerCommentType;

      /**********************
       * Instance variables *
       **********************/

      /**
       * A mapping of internal comment type/ID keys to comment instances.
       *
       * Version Added:
       *     7.0
       */
      #comments = {};

      /**
       * Return an ID used be comment-specific events.
       *
       * This can help with creating a comment-specific ID for the
       * ``issueStatusUpdated`` event.
       *
       * Version Added:
       *     7.0
       *
       * Args:
       *     comment (RB.BaseComment):
       *         The comment the ID will represent.
       *
       * Returns:
       *     string:
       *     The event ID.
       */
      makeCommentEventID(comment) {
        let commentType;
        if (comment instanceof RB.DiffComment) {
          commentType = CommentIssueManagerCommentType.DIFF;
        } else if (comment instanceof RB.FileAttachmentComment) {
          commentType = CommentIssueManagerCommentType.FILE_ATTACHMENT;
        } else if (comment instanceof RB.GeneralComment) {
          commentType = CommentIssueManagerCommentType.GENERAL;
        } else if (comment instanceof RB.ScreenshotComment) {
          commentType = CommentIssueManagerCommentType.SCREENSHOT;
        } else {
          console.error('RB.CommentIssueManager.makeCommentEventID received ' + 'unexpected comment object "%o"', comment);
          return null;
        }
        return `${commentType}:${comment.id}`;
      }

      /**
       * Set the state for a comment.
       *
       * Deprecated:
       *     7.0:
       *     Callers should use :js:meth:`setCommentIssueStatus` instead.
       *     This method is expected to be removed in Review Board 9.
       *
       * Args:
       *     reviewID (number):
       *         The ID of the review the comment belongs to.
       *
       *     commentID (number):
       *         The ID of the comment.
       *
       *     commentType (CommentIssueManagerCommentType):
       *         The type of the comment.
       *
       *     state (CommentIssueStatusType):
       *         The new state for the comment's issue.
       */
      setCommentState(reviewID, commentID, commentType, state) {
        console.group('CommentIssueManager.setCommentState() is deprecated.');
        console.warn('This will be removed in Review Board 9. Please use ' + 'setCommentIssueStatus() instead.');
        console.trace();
        console.groupEnd();
        this.setCommentIssueStatus({
          commentID: commentID,
          commentType: commentType,
          newIssueStatus: state,
          reviewID: reviewID
        });
      }

      /**
       * Set the issue status for a comment.
       *
       * The operation will be performed asynchronously. Callers can await
       * this call, or listen to an event to know when the issue status is
       * updated.
       *
       * Args:
       *     options (SetCommentIssueStatusOptions):
       *         The options for identifying the comment and setting the
       *         issue status.
       */
      async setCommentIssueStatus(options) {
        const comment = await this.getOrCreateComment({
          reviewID: options.reviewID,
          commentID: options.commentID,
          commentType: options.commentType
        });
        await this.#updateIssueStatus(comment, options.newIssueStatus);
      }

      /**
       * Retrieve the model for a given comment.
       *
       * This will either generate the appropriate comment object based on
       * ``commentType``, or grab the comment from a cache if it's been generated
       * before.
       *
       * Deprecated:
       *     7.0:
       *     Callers should use :js:meth:`getOrCreateComment` instead.
       *     This method is expected to be removed in Review Board 9.
       *
       * Args:
       *     reviewID (number):
       *         The ID of the review the comment belongs to.
       *
       *     commentID (number):
       *         The ID of the comment.
       *
       *     commentType (string):
       *         The type of the comment.
       *
       *         This is a valid value in
       *         :js:class:`CommentIssueManagerCommentType`.
       *
       * Returns:
       *     RB.BaseComment:
       *     The comment model.
       */
      getComment(reviewID, commentID, commentType) {
        console.group('CommentIssueManager.getComment() is deprecated.');
        console.warn('This will be removed in Review Board 9. Please use ' + 'getOrCreateComment() instead.');
        console.trace();
        console.groupEnd();
        return this.getOrCreateComment({
          commentID: commentID,
          commentType: commentType,
          reviewID: reviewID
        });
      }

      /**
       * Retrieve the model for a given comment.
       *
       * This will either generate the appropriate comment object based on
       * ``commentType``, or grab the comment from a cache if it's been generated
       * before.
       *
       * Args:
       *     options (GetOrCreateCommentOptions):
       *         The options for identifying or creating the comment.
       *
       * Returns:
       *     RB.BaseComment:
       *     The comment model.
       */
      getOrCreateComment(options) {
        const commentID = options.commentID;
        const commentType = options.commentType;
        const key = `${commentType}-${commentID}`;
        let comment = this.#comments[key];
        if (!comment) {
          const reviewID = options.reviewID;
          const reviewRequest = this.get('reviewRequest');
          switch (commentType) {
            case CommentIssueManagerCommentType.DIFF:
              comment = reviewRequest.createReview(reviewID).createDiffComment({
                beginLineNum: null,
                endLineNum: null,
                fileDiffID: null,
                id: commentID
              });
              break;
            case CommentIssueManagerCommentType.SCREENSHOT:
              comment = reviewRequest.createReview(reviewID).createScreenshotComment(commentID, null, null, null, null, null);
              break;
            case CommentIssueManagerCommentType.FILE_ATTACHMENT:
              comment = reviewRequest.createReview(reviewID).createFileAttachmentComment(commentID, null);
              break;
            case CommentIssueManagerCommentType.GENERAL:
              comment = reviewRequest.createReview(reviewID).createGeneralComment(commentID);
              break;
            default:
              console.error('getComment received unexpected comment type "%s"', commentType);
          }
          this.#comments[key] = comment;
        }
        return comment;
      }

      /**
       * Update the issue status of a comment.
       *
       * This will store the new state in the comment on the server, and then
       * notify listeners of the latest comment information.
       *
       * Args:
       *     comment (RB.BaseComment):
       *         The comment to set the state of.
       *
       *     newIssueStatus (string):
       *         The new issue status for the comment.
       */
      async #updateIssueStatus(comment, newIssueStatus) {
        await comment.ready();
        const oldIssueStatus = comment.get('issueStatus');

        /* Save the new status. */
        comment.set('issueStatus', newIssueStatus);
        const rsp = await comment.save({
          attrs: ['issueStatus']
        });

        /* Notify listeners. */
        this.#notifyIssueStatusChanged(comment, rsp, oldIssueStatus);
      }

      /**
       * Notify listeners that a comment's issue status changed.
       *
       * This will trigger the legacy ``issueStatusUpdated`` event and the
       * modern ``anyIssueStatusUpdated`` and
       * :samp:`issueStatusUpdated:{comment_type}:{comment_id}` events.
       *
       * Args:
       *     comment (RB.BaseComment):
       *         The comment instance that changed.
       *
       *     rsp (object):
       *         The API response object from saving the comment.
       *
       *     oldIssueStatus (CommentIssueStatusType):
       *         The old issue status.
       */
      #notifyIssueStatusChanged(comment, rsp, oldIssueStatus) {
        let rspComment;
        let commentType;
        if (rsp.diff_comment) {
          rspComment = rsp.diff_comment;
          commentType = CommentIssueManagerCommentType.DIFF;
        } else if (rsp.general_comment) {
          rspComment = rsp.general_comment;
          commentType = CommentIssueManagerCommentType.GENERAL;
        } else if (rsp.file_attachment_comment) {
          rspComment = rsp.file_attachment_comment;
          commentType = CommentIssueManagerCommentType.FILE_ATTACHMENT;
        } else if (rsp.screenshot_comment) {
          rspComment = rsp.screenshot_comment;
          commentType = CommentIssueManagerCommentType.SCREENSHOT;
        } else {
          console.error('RB.CommentIssueManager.#notifyIssueStatusChanged received ' + 'unexpected comment object "%o"', rsp);
          return;
        }
        console.assert(rspComment);
        console.assert(commentType);

        /* Trigger the modern events. */
        const eventPayload = {
          comment: comment,
          commentType: commentType,
          newIssueStatus: comment.get('issueStatus'),
          oldIssueStatus: oldIssueStatus,
          timestampStr: rspComment.timestamp
        };
        this.trigger('anyIssueStatusUpdated', eventPayload);
        this.trigger(`issueStatusUpdated:${commentType}:${comment.id}`, eventPayload);

        /* Deprecated as of Review Board 8.0. */
        this.trigger('issueStatusUpdated', comment, oldIssueStatus, rspComment.timestamp, commentType);
      }
    }) || _class$D;

    var _class$C;

    /**
     * Attributes for the DiffCommentsHint model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Resource data returned by the server.
     *
     * Version Added:
     *     7.0
     */

    /**
     * A model for giving the user hints about comments in other revisions.
     *
     * Version Changed:
     *     7.0:
     *     Added the commitsWithComments attribute.
     */
    let DiffCommentsHint = spina.spina(_class$C = class DiffCommentsHint extends spina.BaseModel {
      /**
       * Return the defaults for the model attributes.
       *
       * Returns:
       *     object:
       *     The defaults for the model.
       */
      static defaults() {
        return {
          commitsWithComments: [],
          diffsetsWithComments: [],
          hasOtherComments: false,
          interdiffsWithComments: []
        };
      }

      /**
       * Parse the response from the server.
       *
       * Args:
       *     rsp (object):
       *         The data received from the server.
       *
       * Returns:
       *     object:
       *     The parsed result.
       */
      parse(rsp) {
        return {
          commitsWithComments: rsp.commits_with_comments.map(commit => ({
            baseCommitID: commit.base_commit_id,
            baseCommitPK: commit.base_commit_pk,
            isCurrent: commit.is_current,
            revision: commit.revision,
            tipCommitID: commit.tip_commit_id,
            tipCommitPK: commit.tip_commit_pk
          })),
          diffsetsWithComments: rsp.diffsets_with_comments.map(diffset => ({
            isCurrent: diffset.is_current,
            revision: diffset.revision
          })),
          hasOtherComments: rsp.has_other_comments,
          interdiffsWithComments: rsp.interdiffs_with_comments.map(interdiff => ({
            isCurrent: interdiff.is_current,
            newRevision: interdiff.new_revision,
            oldRevision: interdiff.old_revision
          }))
        };
      }
    }) || _class$C;

    var _class$B;


    /** Attributes for the ReviewRequestEditor model. */

    /**
     * Options for getting a draft field.
     */

    /**
     * Options for setting a draft field.
     */

    /**
     * Model that handles all operations and state for editing review requests.
     *
     * This manages the editing of all fields and objects on a review request,
     * the publishing workflow, and validation.
     */
    let ReviewRequestEditor = spina.spina(_class$B = class ReviewRequestEditor extends spina.BaseModel {
      static strings = {
        UNBALANCED_EDIT_COUNT: gettext("There is an internal error balancing the edit count")
      };
      static defaults() {
        return {
          changeDescriptionRenderedText: '',
          closeDescriptionRenderedText: '',
          commentIssueManager: null,
          commitMessages: [],
          editCount: 0,
          editable: false,
          fileAttachmentComments: {},
          fileAttachments: null,
          hasDraft: false,
          mutableByUser: false,
          publishing: false,
          reviewRequest: null,
          screenshots: null,
          showSendEmail: false,
          statusEditable: false,
          statusMutableByUser: false,
          userDraftExists: false,
          viewingUserDraft: false
        };
      }

      /**
       * Return whether there's another user's draft that's not being viewed.
       *
       * Version Added:
       *     7.0.2
       *
       * Returns:
       *     boolean:
       *     true if there's an existing draft that's owned by another user,
       *     which is not currently being viewed.
       */
      get hasUnviewedUserDraft() {
        return this.get('userDraftExists') && !this.get('viewingUserDraft');
      }

      /**
       * Initialize the editor.
       */
      initialize() {
        const reviewRequest = this.get('reviewRequest');

        // Set up file attachments.
        let fileAttachments = this.get('fileAttachments');
        let allFileAttachments = this.get('allFileAttachments');
        if (fileAttachments === null) {
          fileAttachments = new RB.ResourceCollection([], {
            model: RB.FileAttachment,
            parentResource: reviewRequest.draft
          });
          this.set('fileAttachments', fileAttachments);
        }
        if (allFileAttachments === null) {
          allFileAttachments = new RB.ResourceCollection([], {
            model: RB.FileAttachment,
            parentResource: reviewRequest.draft
          });
          this.set('allFileAttachments', allFileAttachments);
        }
        this.listenTo(fileAttachments, 'add', this._onFileAttachmentOrScreenshotAdded);
        fileAttachments.each(this._onFileAttachmentOrScreenshotAdded.bind(this));
        this.listenTo(fileAttachments, 'remove', this._onFileAttachmentRemoved);

        // Set up screenshots.
        let screenshots = this.get('screenshots');
        if (screenshots === null) {
          screenshots = new Backbone.Collection([], {
            model: RB.Screenshot
          });
          this.set('screenshots', screenshots);
        }
        this.listenTo(screenshots, 'add', this._onFileAttachmentOrScreenshotAdded);
        screenshots.each(this._onFileAttachmentOrScreenshotAdded.bind(this));

        // Connect to other signals.
        this.listenTo(reviewRequest.draft, 'saving', () => this.trigger('saving'));
        this.listenTo(reviewRequest.draft, 'saved', () => this.trigger('saved'));
        this.listenTo(reviewRequest, 'change:state', this._computeEditable);
        this._computeEditable();
      }

      /**
       * Parse the given attributes into model attributes.
       *
       * Args:
       *     attrs (object):
       *        The attributes to parse.
       *
       * Returns:
       *     object:
       *     The parsed attributes.
       */
      parse(attrs) {
        return _.defaults({
          commits: new RB.DiffCommitCollection(attrs.commits || [], {
            parse: true
          })
        }, attrs);
      }

      /**
       * Create a file attachment tracked by the editor.
       *
       * This wraps RB.ReviewRequestDraft.createFileAttachment and stores the
       * file attachment in the fileAttachments collection.
       *
       * This should be used instead of
       * RB.ReviewRequestDraft.createFileAttachment for any existing or newly
       * uploaded file attachments.
       *
       * Args:
       *     attributes (FileAttachmentAttrs, optional):
       *         Model attributes for the new file attachment.
       *
       * Returns:
       *     FileAttachment:
       *     The new file attachment model.
       */
      createFileAttachment(attributes = {}) {
        const draft = this.get('reviewRequest').draft;
        const fileAttachment = draft.createFileAttachment(attributes);
        const attachmentHistoryID = attributes.attachmentHistoryID;
        const fileAttachments = this.get('fileAttachments');
        if (attachmentHistoryID && attachmentHistoryID > 1) {
          /* We're adding a new revision of an existing attachment. */
          fileAttachment.set({
            state: RB.FileAttachmentStates.NEW_REVISION
          });
          const replacedAttachment = fileAttachments.findWhere({
            attachmentHistoryID: attributes.attachmentHistoryID
          });
          const index = fileAttachments.indexOf(replacedAttachment);

          /*
           * Since we're replacing an attachment instead of actually
           * removing one, we silently remove the existing attachment as to
           * not trigger any standard removal handlers.
           *
           * We do however want to remove the existing attachment's
           * thumbnail, so we fire a "replaceAttachment" signal which will
           * be picked up by the ReviewRequestEditorView to remove the
           * thumbnail. Note that we trigger this signal before adding the
           * new attachment so that the existing thumbnail gets removed
           * before the new thumbnail get added.
           */
          fileAttachments.remove(replacedAttachment, {
            silent: true
          });
          this.trigger('replaceAttachment', replacedAttachment);
          fileAttachments.add(fileAttachment, {
            at: index
          });
        } else {
          fileAttachments.add(fileAttachment);
        }
        return fileAttachment;
      }

      /**
       * Return a field from the draft.
       *
       * This will look either in the draft's data or in the extraData (for
       * custom fields), returning the value provided either when the page
       * was generated or when it was last edited.
       *
       * Args:
       *     fieldName (string):
       *         The name of the field to get.
       *
       *     options (GetDraftFieldOptions, optional):
       *         Options for the operation.
       *
       * Returns:
       *     *:
       *     The value of the field.
       */
      getDraftField(fieldName, options = {}) {
        const reviewRequest = this.get('reviewRequest');
        const draft = reviewRequest.draft;
        if (options.useExtraData) {
          let data;
          if (options.useRawTextValue) {
            const rawTextFields = draft.get('rawTextFields');
            if (rawTextFields && rawTextFields.extra_data) {
              data = rawTextFields.extra_data;
            }
          }
          if (!data) {
            data = draft.get('extraData');
          }
          return data[fieldName];
        } else if (fieldName === 'closeDescription' || fieldName === 'closeDescriptionRichText') {
          return reviewRequest.get(fieldName);
        } else {
          return draft.get(fieldName);
        }
      }

      /**
       * Set a field in the draft.
       *
       * If we're in the process of publishing, this will check if we have saved
       * all fields before publishing the draft.
       *
       * Once the field has been saved, two events will be triggered:
       *
       *     * fieldChanged(fieldName, value)
       *     * fieldChanged:<fieldName>(value)
       *
       * Veersion Changed:
       *     6.0:
       *     Removed the callbacks entirely, along with the ``context`` argument.
       *
       * Version Changed:
       *     5.0:
       *     Deprecated callbacks and added a promise return value.
       *
       * Args:
       *     fieldName (string):
       *         The name of the field to set.
       *
       *     value (*):
       *         The value to set in the field.
       *
       *     options (SetDraftFieldOptions, optional):
       *         Options for the set operation.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      async setDraftField(fieldName, value, options = {}) {
        const reviewRequest = this.get('reviewRequest');
        const data = {}; // TODO: add typing once RB.DraftReviewRequest is TS

        let jsonFieldName = options.jsonFieldName;
        console.assert(!!jsonFieldName, `jsonFieldName must be set when setting draft ` + `field "${fieldName}".`);
        if (options.useExtraData) {
          jsonFieldName = `extra_data.${jsonFieldName}`;
        }
        if (options.allowMarkdown) {
          let jsonTextTypeFieldName = options.jsonTextTypeFieldName;
          console.assert(!!jsonTextTypeFieldName, 'jsonTextTypeFieldName must be set.');
          if (options.useExtraData) {
            jsonTextTypeFieldName = `extra_data.${jsonTextTypeFieldName}`;
          }
          const richText = !!options.richText;
          data[jsonTextTypeFieldName] = richText ? 'markdown' : 'plain';
          data.force_text_type = 'html';
          data.include_text_types = 'raw';
        }
        data[jsonFieldName] = value;
        try {
          await reviewRequest.draft.save({
            data
          });
          this.#setHasDraft();
          this.trigger('fieldChanged:' + fieldName, value);
          this.trigger('fieldChanged', fieldName, value);
        } catch (err) {
          let message = '';
          this.set('publishing', false);
          const rsp = err.xhr.errorPayload;

          /*
           * An error can be caused by a 503 when the site is in
           * read-only mode, in which case the fields will be
           * empty.
           */
          if (rsp.fields !== undefined) {
            const fieldValue = rsp.fields[jsonFieldName];
            const fieldValueLen = fieldValue.length;

            /* Wrap each term in quotes or a leading 'and'. */
            _.each(fieldValue, (value, i) => {
              // XXX: This method isn't localizable.
              if (i === fieldValueLen - 1 && fieldValueLen > 1) {
                if (i > 2) {
                  message += ', ';
                }
                message += ` and "${value}"`;
              } else {
                if (i > 0) {
                  message += ', ';
                }
                message += `"${value}"`;
              }
            });
            if (fieldName === 'targetGroups') {
              message = interpolate(ngettext("Group %s does not exist.", "Groups %s do not exist.", fieldValue.length), [message]);
            } else if (fieldName === 'targetPeople') {
              message = interpolate(ngettext("User %s does not exist.", "Users %s do not exist.", fieldValue.length), [message]);
            } else if (fieldName === 'submitter') {
              message = interpolate(gettext("User %s does not exist."), [message]);
            } else if (fieldName === 'dependsOn') {
              message = interpolate(ngettext("Review Request %s does not exist.", "Review Requests %s do not exist.", fieldValue.length), [message]);
            }
          }
          err.message = message;
          throw err;
        }
      }

      /**
       * Publish the draft to the server.
       *
       * This assumes all fields have been saved.
       *
       * If there's an error during saving or validation, the "publishError"
       * event will be triggered with the error message. Otherwise, upon
       * success, the "publish" event will be triggered. However, users will
       * have the chance to cancel the publish in the event that the submitter
       * has been changed.
       *
       * Args:
       *     options (object):
       *         Options for the publish operation.
       *
       * Option Args:
       *     trivial (boolean):
       *         Whether the publish is "trivial" (if true, no e-mail
       *         notifications will be sent).
       */
      async publishDraft(options = {}) {
        const reviewRequest = this.get('reviewRequest');
        try {
          await reviewRequest.draft.ensureCreated();
          if (reviewRequest.attributes.links.submitter.title !== reviewRequest.draft.attributes.links.submitter.title) {
            const confirmed = confirm(gettext("Are you sure you want to change the ownership of this review request? Doing so may prevent you from editing the review request afterwards."));
            if (!confirmed) {
              return;
            }
          }
          await reviewRequest.draft.publish({
            trivial: options.trivial ? 1 : 0
          });
          this.trigger('published');
        } catch (err) {
          this.trigger('publishError', err.message);
        }
      }

      /**
       * Increment an attribute by 1.
       *
       * The attribute must be an integer.
       *
       * Args:
       *     attr (string):
       *         The name of the attribute to increment.
       */
      incr(attr) {
        const value = this.get(attr);
        console.assert(_.isNumber(value));
        this.set(attr, value + 1, {
          validate: true
        });
      }

      /**
       * Decrement an attribute by 1.
       *
       * The attribute must be an integer.
       *
       * Args:
       *     attr (string):
       *         The name of the attribute to decrement.
       */
      decr(attr) {
        const value = this.get(attr);
        console.assert(_.isNumber(value));
        this.set(attr, value - 1, {
          validate: true
        });
      }

      /**
       * Validate the given attributes.
       *
       * Args:
       *     attrs (object):
       *         The attributes to validate.
       */
      validate(attrs) {
        const strings = ReviewRequestEditor.strings;
        if (_.has(attrs, 'editCount') && attrs.editCount < 0) {
          return strings.UNBALANCED_EDIT_COUNT;
        }
      }

      /**
       * Compute the editable state of the review request and open/close states.
       *
       * The review request is editable if the user has edit permissions and it's
       * not closed.
       *
       * The close state and accompanying description is editable if the user
       * has the ability to close the review request and it's currently closed.
       */
      _computeEditable() {
        const state = this.get('reviewRequest').get('state');
        const pending = state === RB.ReviewRequest.PENDING;
        this.set({
          editable: this.get('mutableByUser') && pending,
          statusEditable: this.get('statusMutableByUser') && !pending
        });
      }

      /**
       * Handle when a FileAttachment or Screenshot is added.
       *
       * Listens for events on the FileAttachment or Screenshot and relays
       * them to the editor.
       *
       * Args:
       *     attachment (FileAttachment or RB.Screenshot):
       *         The new file attachment or screenshot.
       */
      _onFileAttachmentOrScreenshotAdded(attachment) {
        this.listenTo(attachment, 'saving', () => this.trigger('saving'));
        this.listenTo(attachment, 'saved destroy', () => {
          this.#setHasDraft();
          this.trigger('saved');
        });
      }

      /**
       * Handle when a FileAttachment is removed.
       *
       * Version Added:
       *     6.0
       *
       * Args:
       *     fileAttachment (RB.FileAttachment):
       *         The file attachment.
       *
       *     collection (Backbone.Collection):
       *         The collection of all file attachments.
       *
       *     options (object):
       *         Options.
       *
       * Option Args:
       *     index (number):
       *         The index of the file attachment being removed.
       */
      _onFileAttachmentRemoved(fileAttachment, collection, options) {
        const state = fileAttachment.get('state');
        const fileAttachments = this.get('fileAttachments');
        const allFileAttachments = this.get('allFileAttachments');
        if (state === RB.FileAttachmentStates.NEW_REVISION) {
          /*
           * We're removing a new revision of a published file attachment.
           * Add the published file attachment back to the list of file
           * attachments to display it again.
           */
          const historyID = fileAttachment.get('attachmentHistoryID');
          const revision = fileAttachment.get('revision');
          const replacedAttachment = allFileAttachments.findWhere({
            attachmentHistoryID: historyID,
            revision: revision - 1
          });
          fileAttachments.add(replacedAttachment, {
            at: options.index
          });
        } else if (state === RB.FileAttachmentStates.PUBLISHED) {
          /*
           * We're removing a published file attachment. Change its state
           * and add it back to the list to continue displaying it.
           */
          fileAttachment.set({
            state: RB.FileAttachmentStates.PENDING_DELETION
          });
          fileAttachments.add(fileAttachment.clone(), {
            at: options.index
          });
        }
      }

      /**
       * Mark that a draft has been created.
       *
       * In this case of an admin or other privileged user creating a draft on a
       * review request that they do not own, this will set additional state and
       * modify the browser's URL to indicate that they're viewing a draft on
       * someone else's review request.
       */
      #setHasDraft() {
        const reviewRequest = this.get('reviewRequest');

        /*
         * The conditional access here is because unit tests often don't add
         * the links to the object.
         */
        const owner = reviewRequest.get('links')?.submitter.title;
        const username = RB.UserSession.instance.get('username');
        if (owner !== username) {
          /*
           * Set this first without notifications, because we don't want page
           * views to reload the page.
           */
          this.set({
            'userDraftExists': true,
            'viewingUserDraft': true
          }, {
            silent: true
          });
          if (!window.rbRunningTests) {
            const location = window.location;
            const params = new URLSearchParams(location.search);
            params.set('view-draft', '1');
            let url = `${location.pathname}?${params.toString()}`;
            if (location.hash) {
              url += location.hash;
            }
            window.history.pushState(null, '', url);
          }
        }
        this.set('hasDraft', true);
      }
    }) || _class$B;

    var _class$A;

    /** Attributes for the ReviewablePage model. */

    /** The format of data passed in to the object. */

    /**
     * A page used for editing, viewing, or reviewing review requests.
     *
     * This is responsible for setting up objects needed for manipulating a
     * review request or related state, for performing reviews, or otherwise
     * handling review-related tasks.
     *
     * This can be used directly or can be subclassed in order to provide
     * additional logic.
     */
    let ReviewablePage = spina.spina(_class$A = class ReviewablePage extends RB.Page {
      static defaults = {
        checkForUpdates: false,
        checkUpdatesType: null,
        lastActivityTimestamp: null,
        pendingReview: null,
        reviewRequest: null
      };

      /**********************
       * Instance variables *
       **********************/

      /** Manages the issue states for published comments. */

      /** Manages the edit states and capabilities for the review request. */

      /**
       * Initialize the page.
       *
       * This will construct a series of objects needed to work with reviews
       * and the review request. It will also begin checking for updates made
       * to the page, notifying the user if anything has changed.
       *
       * Args:
       *     attributes (ReviewablePageAttrs):
       *         Initial attributes passed to the constructor. This is used to
       *         access initial state that won't otherwise be stored in this
       *         page.
       *
       *     options (object):
       *         Options for the page.
       */
      initialize(attributes, options) {
        super.initialize(attributes, options);
        const reviewRequest = this.get('reviewRequest');
        console.assert(reviewRequest, 'The reviewRequest attribute or parse=true must be provided.');
        console.assert(this.get('pendingReview'), 'The pendingReview attribute or parse=true must be provided.');
        this.commentIssueManager = new RB.CommentIssueManager({
          reviewRequest: reviewRequest
        });
        const editorData = attributes.editorData || {};
        const reviewRequestOrDraft = editorData.mutableByUser ? reviewRequest.draft : reviewRequest;
        const fileAttachments = new RB.ResourceCollection(_.map(editorData.fileAttachments, attrs => reviewRequestOrDraft.createFileAttachment(attrs)), {
          model: RB.FileAttachment,
          parentResource: reviewRequestOrDraft
        });
        const allFileAttachments = new RB.ResourceCollection(_.map(editorData.allFileAttachments, attrs => reviewRequestOrDraft.createFileAttachment(attrs)), {
          model: RB.FileAttachment,
          parentResource: reviewRequestOrDraft
        });
        this.reviewRequestEditor = new ReviewRequestEditor(_.defaults({
          allFileAttachments: allFileAttachments,
          commentIssueManager: this.commentIssueManager,
          fileAttachments: fileAttachments,
          reviewRequest: reviewRequest
        }, editorData), {
          parse: true
        });
        this.listenTo(reviewRequest, 'updated', info => this.trigger('reviewRequestUpdated', info));
        if (this.get('checkForUpdates')) {
          this._registerForUpdates();
        }
      }

      /**
       * Post a review marked as Ship It.
       *
       * This will create and publish a review, setting the Ship It state and
       * changing the text to say "Ship It!".
       */
      async markShipIt(idElement = '') {
        const pendingReview = this.get('pendingReview');
        await pendingReview.ready();
        const temp_bodyTop = idElement === '' ? 'Ship It!' : `Ship It!|${idElement}`;
        pendingReview.set({
          bodyTop: temp_bodyTop,
          shipIt: true
        });
        await pendingReview.publish();
      }

      /**
       * Parse the data for the page.
       *
       * This will take data from the server and turn it into a series of
       * objects and attributes needed for parts of the page.
       *
       * Args:
       *     rsp (object):
       *         The incoming data provided for the page.
       *
       * Returns:
       *     object:
       *     The resulting attributes for the page.
       */
      parse(rsp) {
        let reviewRequestData;
        if (rsp.reviewRequestData) {
          reviewRequestData = _.defaults({
            state: RB.ReviewRequest[rsp.reviewRequestData.state],
            visibility: RB.ReviewRequest['VISIBILITY_' + rsp.reviewRequestData.visibility]
          }, rsp.reviewRequestData);
          if (reviewRequestData.repository) {
            reviewRequestData.repository = new RB.Repository(_.defaults({
              localSitePrefix: rsp.reviewRequestData.localSitePrefix
            }, rsp.reviewRequestData.repository));
          }
        }
        const reviewRequest = new RB.ReviewRequest(reviewRequestData, {
          extraDraftAttrs: rsp.extraReviewRequestDraftData
        });
        return {
          checkForUpdates: rsp.checkForUpdates,
          checkUpdatesType: rsp.checkUpdatesType,
          lastActivityTimestamp: rsp.lastActivityTimestamp,
          pendingReview: reviewRequest.createReview(),
          reviewRequest: reviewRequest
        };
      }

      /**
       * Register for update notification to the review request from the server.
       *
       * The server will be periodically checked for new updates. When a new
       * update arrives, an update bubble will be displayed in the bottom-right
       * of the page, and if the user has allowed desktop notifications in their
       * account settings, a desktop notification will be shown with the update
       * information.
       */
      _registerForUpdates() {
        this.get('reviewRequest').beginCheckForUpdates(this.get('checkUpdatesType'), this.get('lastActivityTimestamp'));
      }
    }) || _class$A;

    var _class$z;

    /** Attributes for the DiffViewerPage model. */

    /** The format of data passed in to the object. */

    /** The options for loading a new diff revision. */

    /**
     * The model for the diff viewer page.
     *
     * This handles all attribute storage and diff context parsing needed to
     * display and update the diff viewer.
     */
    let DiffViewerPage = spina.spina(_class$z = class DiffViewerPage extends ReviewablePage {
      static defaults = {
        allChunksCollapsed: false,
        canDownloadDiff: false,
        canToggleExtraWhitespace: false,
        filenamePatterns: null,
        numDiffs: 1
      };

      /**********************
       * Instance variables *
       **********************/

      /** The hint for comments in other revisions. */

      /** The diff of all the files between currently-shown commits. */

      /** The set of commits attached to the review request. */

      /** The set of reviewables for currently-shown files. */

      /** The set of currently-shown files. */

      /** Paginator for all of the diff files. */

      /** The current diff revision. */

      /**
       * Handle pre-parse initialization.
       *
       * This defines child objects for managing state related to the page
       * prior to parsing the provided attributes payload and initializing
       * the instance.
       */
      preinitialize() {
        this.commentsHint = new DiffCommentsHint();
        this.commits = new RB.DiffCommitCollection();
        this.commitHistoryDiff = new RB.CommitHistoryDiffEntryCollection();
        this.files = new DiffFileCollection();
        this.pagination = new RB.Pagination();
        this.revision = new RB.DiffRevision();
      }

      /**
       * Initialize the page.
       *
       * This will begin listening for events on the page and set up default
       * state.
       */
      initialize(...args) {
        super.initialize(...args);
        this.diffReviewables = new RB.DiffReviewableCollection([], {
          reviewRequest: this.get('reviewRequest')
        });
        this.diffReviewables.watchFiles(this.files);
      }

      /**
       * Parse the data for the page.
       *
       * Args:
       *     rsp (DiffViewerPageParseData):
       *         The payload to parse.
       *
       * Returns:
       *     DiffViewerPageAttrs:
       *     The returned attributes.
       */
      parse(rsp) {
        const attrs = _.extend(this._parseDiffContext(rsp), super.parse(rsp));
        if (rsp.allChunksCollapsed !== undefined) {
          attrs.allChunksCollapsed = rsp.allChunksCollapsed;
        }
        if (rsp.canToggleExtraWhitespace !== undefined) {
          attrs.canToggleExtraWhitespace = rsp.canToggleExtraWhitespace;
        }
        return attrs;
      }

      /**
       * Load a new diff from the server.
       *
       * Args:
       *     options (LoadDiffRevisionOptions):
       *         The options for the diff to load.
       */
      loadDiffRevision(options = {}) {
        const reviewRequestURL = this.get('reviewRequest').url();
        const queryData = [];
        if (options.revision) {
          queryData.push({
            name: 'revision',
            value: options.revision
          });
        }
        if (options.interdiffRevision) {
          queryData.push({
            name: 'interdiff-revision',
            value: options.interdiffRevision
          });
        } else {
          if (options.baseCommitID) {
            queryData.push({
              name: 'base-commit-id',
              value: options.baseCommitID
            });
          }
          if (options.tipCommitID) {
            queryData.push({
              name: 'tip-commit-id',
              value: options.tipCommitID
            });
          }
        }
        if (options.page && options.page !== 1) {
          queryData.push({
            name: 'page',
            value: options.page
          });
        }
        if (options.filenamePatterns) {
          queryData.push({
            name: 'filenames',
            value: options.filenamePatterns
          });
        }
        const url = Djblets.buildURL({
          baseURL: `${reviewRequestURL}diff-context/`,
          queryData: queryData
        });
        $.ajax(url).done(rsp => this.set(this._parseDiffContext(rsp.diff_context)));
      }

      /**
       * Parse context for a displayed diff.
       *
       * Args:
       *     rsp (object):
       *         The payload to parse.
       *
       * Returns:
       *     object:
       *     The returned attributes.
       */
      _parseDiffContext(rsp) {
        if (rsp.comments_hint) {
          this.commentsHint.set(this.commentsHint.parse(rsp.comments_hint));
        }
        if (rsp.files) {
          this.files.reset(rsp.files, {
            parse: true
          });
        }
        if (rsp.pagination) {
          this.pagination.set(this.pagination.parse(rsp.pagination));
        }
        if (rsp.revision) {
          this.revision.set(this.revision.parse(rsp.revision));
        }
        this.commitHistoryDiff.reset(rsp.commit_history_diff || [], {
          parse: true
        });
        if (rsp.commits) {
          /*
           * The RB.DiffCommitListView listens for the reset event on the
           * commits collection to trigger a render, so it must be updated
           * **after** the commit history is updated.
           */
          this.commits.reset(rsp.commits, {
            parse: true
          });
        }
        return {
          canDownloadDiff: rsp.revision && rsp.revision.interdiff_revision === null,
          filenamePatterns: rsp.filename_patterns || null,
          numDiffs: rsp.num_diffs || 0
        };
      }
    }) || _class$z;

    var _class$y;

    /**
     * Attributes for the FileAttachmentReviewable model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Provides generic review capabilities for file attachments.
     *
     * See Also:
     *     :js:class:`RB.AbstractReviewable`:
     *         For attributes defined on the base model.
     */
    let FileAttachmentReviewable = spina.spina(_class$y = class FileAttachmentReviewable extends AbstractReviewable {
      static defaults = {
        attachmentRevisionIDs: null,
        diffAgainstFileAttachmentID: null,
        diffCaption: '',
        diffRevision: null,
        diffTypeMismatch: false,
        fileAttachmentID: null,
        fileRevision: null,
        filename: '',
        numRevisions: null,
        state: null
      };
      static defaultCommentBlockFields = ['fileAttachmentID', 'diffAgainstFileAttachmentID', 'state'];

      /**
       * Load a serialized comment and add comment blocks for it.
       *
       * Args:
       *     serializedComments (Array of SerializedComment):
       *         The serialized data for the new comment block(s).
       */
      loadSerializedCommentBlock(serializedComments) {
        const parsedData = this.commentBlockModel.prototype.parse(_.pick(serializedComments[0], this.commentBlockModel.prototype.serializedFields));
        this.createCommentBlock(_.extend({
          diffAgainstFileAttachmentID: this.get('diffAgainstFileAttachmentID'),
          fileAttachmentID: this.get('fileAttachmentID'),
          serializedComments: serializedComments,
          state: this.get('state')
        }, parsedData));
      }
    }) || _class$y;

    var _class$x;

    /**
     * Generic review capabilities for file types which cannot be displayed.
     */
    let DummyReviewable = spina.spina(_class$x = class DummyReviewable extends FileAttachmentReviewable {
      static commentBlockModel = AbstractCommentBlock;
    }) || _class$x;

    var _class$w;

    /**
     * Attributes for the FileAttachmentCommentBlock model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Represents the comments on a file attachment.
     *
     * FileAttachmentCommentBlock deals with creating and representing comments
     * that exist on a file attachment. It's a base class that is meant to be
     * subclassed.
     *
     * See Also:
     *     :js:class:`RB.AbstractCommentBlock`:
     *         For attributes defined on the base model.
     */
    let FileAttachmentCommentBlock = spina.spina(_class$w = class FileAttachmentCommentBlock extends AbstractCommentBlock {
      /** Default values for the model attributes. */
      static defaults = {
        diffAgainstFileAttachmentID: null,
        fileAttachmentID: null,
        state: null
      };

      /**
       * Create a FileAttachmentComment for the given comment ID.
       *
       * The subclass's storeCommentData will be called, allowing additional
       * data to be stored along with the comment.
       *
       * Args:
       *     id (number):
       *         The ID of the comment to instantiate the model for.
       *
       * Returns:
       *     RB.FileAttachmentComment:
       *     The new comment model.
       */
      createComment(id) {
        const comment = this.get('review').createFileAttachmentComment(id, this.get('fileAttachmentID'), this.get('diffAgainstFileAttachmentID'));
        _.extend(comment.get('extraData'), _.pick(this.attributes, this.serializedFields));
        return comment;
      }

      /**
       * Return a warning about commenting on a deleted object.
       *
       * Version Added:
       *     6.0
       *
       * Returns:
       *     string:
       *     A warning to display to the user if they're commenting on a deleted
       *     object. Return null if there's no warning.
       */
      getDeletedWarning() {
        if (this.get('state') === RB.FileAttachmentStates.DELETED) {
          return gettext("This file is deleted and cannot be commented on.");
        } else {
          return null;
        }
      }

      /**
       * Return a warning about commenting on a draft object.
       *
       * Returns:
       *     string:
       *     A warning to display to the user if they're commenting on a draft
       *     object. Return null if there's no warning.
       */
      getDraftWarning() {
        const state = this.get('state');
        if (state === RB.FileAttachmentStates.NEW || state === RB.FileAttachmentStates.NEW_REVISION || state === RB.FileAttachmentStates.DRAFT) {
          return gettext("The file for this comment is still a draft. Replacing or deleting the file will delete this comment.");
        } else {
          return null;
        }
      }
    }) || _class$w;

    var _class$v;

    /**
     * Attributes for the RegionCommentBlock model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * The serialized comment data.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Represents the comments on a region of an image or document.
     *
     * RegionCommentBlock deals with creating and representing comments
     * that exist in a specific region of some content.
     *
     * See Also:
     *     :js:class:`RB.FileAttachmentCommentBlock`:
     *         For attributes defined on the base model.
     *
     *     :js:class:`RB.AbstractCommentBlock`:
     *         For attributes defined on all comment block models.
     */
    let RegionCommentBlock = spina.spina(_class$v = class RegionCommentBlock extends FileAttachmentCommentBlock {
      /** Default values for the model attributes. */
      static defaults = {
        height: null,
        width: null,
        x: null,
        y: null
      };
      static serializedFields = ['x', 'y', 'width', 'height'];

      /**
       * Parse the incoming attributes for the comment block.
       *
       * The fields are stored server-side as strings, so we need to convert
       * them back to integers where appropriate.
       *
       * Args:
       *     fields (object):
       *         The serialized fields for the comment.
       *
       * Returns:
       *     object:
       *     The parsed data.
       */
      parse(fields) {
        return {
          height: parseInt(fields.height, 10) || undefined,
          width: parseInt(fields.width, 10) || undefined,
          x: parseInt(fields.x, 10) || undefined,
          y: parseInt(fields.y, 10) || undefined
        };
      }

      /**
       * Return whether the bounds of this region can be updated.
       *
       * If there are any existing published comments on this region, it
       * cannot be updated.
       *
       * Returns:
       *     boolean:
       *     A value indicating whether new bounds can be set for this region.
       */
      canUpdateBounds() {
        return _.isEmpty(this.get('serializedComments'));
      }

      /**
       * Save the new bounds of the draft comment to the server.
       *
       * The new bounds will be stored in the comment's ``x``, ``y``,
       * ``width``, and ``height`` keys in ``extra_data``.
       */
      async saveDraftCommentBounds() {
        const draftComment = this.get('draftComment');
        await draftComment.ready();
        const extraData = draftComment.get('extraData');
        extraData.x = Math.round(this.get('x'));
        extraData.y = Math.round(this.get('y'));
        extraData.width = Math.round(this.get('width'));
        extraData.height = Math.round(this.get('height'));
        await draftComment.save({
          attrs: ['extra_data.x', 'extra_data.y', 'extra_data.width', 'extra_data.height'],
          boundsUpdated: true
        });
      }
    }) || _class$v;

    var _class$u;

    /**
     * Attributes for the ImageReviewable model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Provides review capabilities for image file attachments.
     */
    let ImageReviewable = spina.spina(_class$u = class ImageReviewable extends FileAttachmentReviewable {
      static defaults = {
        diffAgainstImageURL: '',
        imageURL: '',
        scale: 1
      };
      static commentBlockModel = RegionCommentBlock;
    }) || _class$u;

    var _class$t;

    /**
     * Attributes for the ScreenshotCommentBlock model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Represents the comments on a region of a screenshot.
     *
     * ScreenshotCommentBlock deals with creating and representing comments
     * that exist in a specific region of a screenshot.
     *
     * See Also:
     *     :js:class:`RB.AbstractCommentBlock`:
     *         For attributes defined on the base model.
     */
    let ScreenshotCommentBlock = spina.spina(_class$t = class ScreenshotCommentBlock extends AbstractCommentBlock {
      /** The default values for the model attributes. */
      static defaults = {
        height: null,
        screenshotID: null,
        width: null,
        x: null,
        y: null
      };

      /**
       * Return whether the bounds of this region can be updated.
       *
       * If there are any existing published comments on this region, it
       * cannot be updated.
       *
       * Returns:
       *     boolean:
       *     A value indicating whether new bounds can be set for this region.
       */
      canUpdateBounds() {
        return false;
      }

      /**
       * Creates a ScreenshotComment for the given comment ID.
       *
       * Args:
       *     id (number):
       *         The ID of the comment to instantiate the model for.
       *
       * Returns:
       *     RB.ScreenshotComment:
       *     The new comment model.
       */
      createComment(id) {
        return this.get('review').createScreenshotComment(id, this.get('screenshotID'), this.get('x'), this.get('y'), this.get('width'), this.get('height'));
      }
    }) || _class$t;

    var _class$s;

    /**
     * Attributes for the ScreenshotReviewable model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Provides review capabilities for screenshots.
     *
     * See Also:
     *     :js:class:`RB.AbstractReviewable`:
     *         For the attributes defined by the base model.
     */
    let ScreenshotReviewable = spina.spina(_class$s = class ScreenshotReviewable extends AbstractReviewable {
      static defaults = {
        caption: '',
        imageURL: '',
        screenshotID: null
      };
      static commentBlockModel = ScreenshotCommentBlock;
      static defaultCommentBlockFields = ['screenshotID'];

      /**
       * Load a serialized comment and add comment blocks for it.
       *
       * Args:
       *     serializedCommentBlock (object):
       *         The serialized data for the new comment block(s).
       */
      loadSerializedCommentBlock(serializedCommentBlock) {
        this.createCommentBlock({
          height: serializedCommentBlock[0].height,
          screenshotID: this.get('screenshotID'),
          serializedComments: serializedCommentBlock,
          width: serializedCommentBlock[0].width,
          x: serializedCommentBlock[0].x,
          y: serializedCommentBlock[0].y
        });
      }
    }) || _class$s;

    var _class$r;

    /**
     * Attributes for the TextCommentBlock model.
     *
     * Version Added:
     *     6.0
     */

    /**
     * The serialized comment data.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Represents the comments on an element in a text-based file attachment.
     *
     * TextCommentBlock deals with creating and representing comments
     * that exist on a specific element of some content.
     *
     * See Also:
     *     :js:class:`RB.FileAttachmentCommentBlock`:
     *         For the attributes defined by the base model.
     *
     *     :js:class:`RB.AbstractCommentBlock`:
     *         For the attributes defined on all comment block.
     */
    let TextCommentBlock = spina.spina(_class$r = class TextCommentBlock extends FileAttachmentCommentBlock {
      static defaults = {
        $beginRow: null,
        $endRow: null,
        beginLineNum: null,
        endLineNum: null,
        viewMode: null
      };
      static serializedFields = ['beginLineNum', 'endLineNum', 'viewMode'];

      /**
       * Parse the incoming attributes for the comment block.
       *
       * The fields are stored server-side as strings, so we need to convert
       * them back to integers where appropriate.
       *
       * Args:
       *     fields (object):
       *         The attributes for the comment, as returned by the server.
       *
       * Returns:
       *     object:
       *     The parsed data.
       */
      parse(fields) {
        return {
          beginLineNum: parseInt(fields.beginLineNum, 10),
          endLineNum: parseInt(fields.endLineNum, 10),
          viewMode: fields.viewMode
        };
      }
    }) || _class$r;

    var _class$q;

    /**
     * Attributes for the TextBasedReviewable model.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Provides generic review capabilities for text-based file attachments.
     */
    let TextBasedReviewable = spina.spina(_class$q = class TextBasedReviewable extends FileAttachmentReviewable {
      static defaults = {
        hasRenderedView: false,
        viewMode: 'source'
      };
      static commentBlockModel = TextCommentBlock;
      static defaultCommentBlockFields = ['viewMode'].concat(super.defaultCommentBlockFields);
    }) || _class$q;

    var _class$p;

    /**
     * Information about a selectable draft mode.
     *
     * Version Added:
     *     6.0
     */

    /**
     * Attributes for the UnifiedBanner model.
     *
     * Version Added:
     *     6.0
     */

    /**
     * State for the unified banner.
     *
     * Keeps track of drafts for the review request, review, and review replies.
     *
     * Version Added:
     *     6.0
     */
    let UnifiedBanner = spina.spina(_class$p = class UnifiedBanner extends spina.BaseModel {
      static defaults() {
        return {
          draftModes: [],
          numDrafts: 0,
          pendingReview: null,
          reviewReplyDrafts: [],
          reviewRequest: null,
          reviewRequestEditor: null,
          selectedDraftMode: 0,
          userDraftMessage: null
        };
      }

      /**
       * Initialize the Unified Review Banner State.
       *
       * Sets listeners on the saved and destroy events for the review request
       * and review to re-check if the state has at least one draft. At the end
       * of initialization, checks if at least one draft exists already.
       */
      initialize() {
        const editor = this.get('reviewRequestEditor');
        const reviewRequest = this.get('reviewRequest');
        const pendingReview = this.get('pendingReview');
        console.assert(!!reviewRequest, 'reviewRequest must be provided');
        console.assert(!!pendingReview, 'pendingReview must be provided');
        this.listenTo(editor, 'change:hasDraft', this.#updateDraftModes);
        this.listenTo(reviewRequest.draft, 'saved destroyed', this.#updateDraftModes);
        this.listenTo(pendingReview, 'saved destroyed', this.#updateDraftModes);

        /*
         * We swallow errors when calling ready() on the draft, because we
         * often will not have permissions to access the draft resource.
         */
        Promise.all([reviewRequest.draft.ready().catch(() => undefined), pendingReview.ready()]).then(() => this.#updateDraftModes());
      }

      /**
       * Update the draft state for the given review reply.
       *
       * Args:
       *     reviewReply (ReviewReply):
       *         The review reply model.
       *
       *     hasReviewReplyDraft (boolean):
       *          Whether the reviewReply passed in has a draft.
       */
      updateReplyDraftState(reviewReply, hasReviewReplyDraft) {
        const reviewReplyDrafts = this.get('reviewReplyDrafts');
        if (hasReviewReplyDraft) {
          if (!reviewReplyDrafts.includes(reviewReply)) {
            reviewReplyDrafts.push(reviewReply);
            this.set('reviewReplyDrafts', reviewReplyDrafts);
          }
        } else {
          this.set('reviewReplyDrafts', _.without(reviewReplyDrafts, reviewReply));
        }
        this.#updateDraftModes();
      }

      /**
       * Update the list of available draft modes.
       */
      #updateDraftModes() {
        const editor = this.get('reviewRequestEditor');
        const forceViewUserDraft = editor.get('forceViewUserDraft');
        const userDraftExists = editor.get('userDraftExists');
        const viewingUserDraft = editor.get('viewingUserDraft');
        const reviewRequest = this.get('reviewRequest');
        const pendingReview = this.get('pendingReview');
        const reviewReplyDrafts = this.get('reviewReplyDrafts');
        const reviewRequestPublic = reviewRequest.get('public');
        const reviewRequestDraft = !reviewRequest.draft.isNew() && !editor.hasUnviewedUserDraft;
        const reviewDraft = !pendingReview.isNew();
        const numReplies = reviewReplyDrafts.length;
        const numDrafts = numReplies + (reviewRequestDraft ? 1 : 0) + (reviewDraft ? 1 : 0);
        const draftModes = [];
        if (!reviewRequestPublic) {
          /* Review request has never been published */

          if (reviewDraft) {
            /* Review request draft + review draft */
            draftModes.push({
              hasReview: true,
              hasReviewReplies: false,
              hasReviewRequest: true,
              multiple: true,
              text: gettext("Draft and review")
            });
            draftModes.push({
              hasReview: false,
              hasReviewReplies: false,
              hasReviewRequest: true,
              multiple: false,
              text: gettext("Review request draft")
            });
            draftModes.push({
              hasReview: true,
              hasReviewReplies: false,
              hasReviewRequest: false,
              multiple: false,
              text: gettext("Review of the change")
            });
          } else {
            draftModes.push({
              hasReview: false,
              hasReviewReplies: false,
              hasReviewRequest: true,
              multiple: false,
              text: gettext("This review request is a draft")
            });
          }
        } else if (reviewRequestDraft) {
          /* Review request draft */

          if (reviewDraft) {
            /* Review request draft + review draft */
            draftModes.push({
              hasReview: false,
              hasReviewReplies: false,
              hasReviewRequest: true,
              multiple: false,
              text: gettext("Review request changes")
            });
            draftModes.push({
              hasReview: true,
              hasReviewReplies: false,
              hasReviewRequest: false,
              multiple: false,
              text: gettext("Review of the change")
            });
            if (numReplies > 0) {
              /* Review request draft + review draft + reply drafts */
              draftModes.unshift({
                hasReview: true,
                hasReviewReplies: true,
                hasReviewRequest: true,
                multiple: true,
                text: interpolate(ngettext("Changes, review, and %(numReplies)s reply", "Changes, review, and %(numReplies)s replies", numReplies), {
                  "numReplies": numReplies
                }, true)
              });
            } else {
              draftModes.unshift({
                hasReview: true,
                hasReviewReplies: false,
                hasReviewRequest: true,
                multiple: true,
                text: gettext("Changes and review")
              });
            }
          } else {
            if (numReplies > 0) {
              /* Review request draft + reply drafts */
              draftModes.push({
                hasReview: false,
                hasReviewReplies: true,
                hasReviewRequest: true,
                multiple: true,
                text: interpolate(ngettext("Changes and %(numReplies)s reply", "Changes and %(numReplies)s replies", numReplies), {
                  "numReplies": numReplies
                }, true)
              });
              draftModes.push({
                hasReview: false,
                hasReviewReplies: false,
                hasReviewRequest: true,
                multiple: false,
                text: gettext("Review request changes")
              });
            } else {
              /* Review request draft only */
              draftModes.push({
                hasReview: false,
                hasReviewReplies: false,
                hasReviewRequest: true,
                multiple: false,
                text: gettext("Your review request has changed")
              });
            }
          }
        } else if (reviewDraft) {
          /* Review draft */

          if (numReplies > 0) {
            /* Review draft + reply drafts */
            draftModes.push({
              hasReview: true,
              hasReviewReplies: true,
              hasReviewRequest: false,
              multiple: true,
              text: interpolate(ngettext("Review and %(numReplies)s reply", "Review and %(numReplies)s replies", numReplies), {
                "numReplies": numReplies
              }, true)
            });
            draftModes.push({
              hasReview: true,
              hasReviewReplies: false,
              hasReviewRequest: false,
              multiple: false,
              text: gettext("Review of the change")
            });
          } else {
            /* Review draft only */
            draftModes.push({
              hasReview: true,
              hasReviewReplies: false,
              hasReviewRequest: false,
              multiple: false,
              text: gettext("Reviewing this change")
            });
          }
        } else {
          if (numReplies > 1) {
            /* Multiple reply drafts */
            draftModes.push({
              hasReview: false,
              hasReviewReplies: true,
              hasReviewRequest: false,
              multiple: true,
              text: interpolate(gettext("%(numReplies)s replies"), {
                "numReplies": numReplies
              }, true)
            });
          }
        }
        for (let i = 0; i < reviewReplyDrafts.length; i++) {
          const replyDraft = reviewReplyDrafts[i];
          const review = replyDraft.get('parentObject');
          draftModes.push({
            hasReview: false,
            hasReviewReplies: true,
            hasReviewRequest: false,
            multiple: false,
            singleReviewReply: i,
            text: interpolate(gettext("Replying to %(value1)s's review"), {
              "value1": review.get('authorName')
            }, true)
          });
        }
        let selectedDraftMode = this.get('selectedDraftMode');
        if (selectedDraftMode >= draftModes.length) {
          selectedDraftMode = 0;
        }
        let userDraftMessage = null;

        /*
         * These handle the case where the user is viewing another user's
         * review request, and they have permission to access/manage
         * the draft. In the case of review requests which are public,
         * they can then switch between the published/draft states.
         */
        if (viewingUserDraft) {
          userDraftMessage = gettext("You are viewing an unpublished draft on a review request owned by another user.");
          if (!forceViewUserDraft) {
            userDraftMessage += ` <a href="#">${gettext("View only published data.")}</a>`;
          }
        } else if (userDraftExists) {
          userDraftMessage = gettext("This review request has an unpublished draft.");
          if (!forceViewUserDraft) {
            userDraftMessage += ` <a href="#">${gettext("View draft data.")}</a>`;
          }
        }
        this.set({
          draftModes,
          numDrafts,
          selectedDraftMode,
          userDraftMessage
        });
      }
    }) || _class$p;

    var _dec$7, _class$o, _dec2$2, _class2$7, _class3$5, _class4$4, _class5$4, _class6$4, _class7$3, _class8$2, _class9$1, _class10$1, _class11$1, _class12$1, _class13$1, _class14$1, _class15, _class16, _class17, _class18, _class19;


    /** Options for field views. */

    /**
     * A type for the constructor of an inline editor.
     *
     * Version Added:
     *     7.0.2
     */

    /**
     * Base class for all field views.
     */
    let BaseFieldView = (_dec$7 = spina.spina({
      prototypeAttrs: ['editableProp', 'useExtraData']
    }), _dec$7(_class$o = class BaseFieldView extends spina.BaseView {
      /**
       * The name of the property in the model for if this field is editable.
       */
      static editableProp = 'editable';
      /** Whether the contents of the field should be stored in extraData. */
      static useExtraData = true;

      /**********************
       * Instance variables *
       **********************/

      /** The ID of the field. */

      /**
       * The label for the field.
       *
       * Version Added:
       *     6.0
       */

      /** The name to use when storing the data as JSON. */

      /** The name of to use when storing the data in a model attribute. */

      /** The review request editor view. */

      /**
       * Initialize the view.
       *
       * Args:
       *     options (BaseFieldViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.fieldID = options.fieldID;
        this.fieldLabel = options.fieldLabel || null;
        this.jsonFieldName = options.jsonFieldName || this.jsonFieldName || this.fieldID;
        this.$el.data('field-id', this.fieldID);
      }

      /**
       * The name of the attribute within the model.
       *
       * Returns:
       *     string:
       *     The name of the attribute that this field will reflect.
       */
      fieldName() {
        /*
         * This implementation will convert names with underscores to camel
         * case. This covers the typical naming between Python and JavaScript.
         * If subclasses need something different, they can override this with
         * either a new function or a regular attribute.
         */
        if (this._fieldName === undefined) {
          this._fieldName = this.fieldID.replace(/_(.)/g, (m, c) => c.toUpperCase());
        }
        return this._fieldName;
      }

      /**
       * Load the stored value for the field.
       *
       * This will load from the draft if representing a built-in field
       * (``useExtraData === false``) or from extra_data if a custom field
       * (``useExtraData === true``).
       *
       * Args:
       *     options (GetDraftFieldOptions):
       *         Options for :js:func:`RB.ReviewRequestEditor.getDraftField`.
       *
       * Returns:
       *     *:
       *     The stored value for the field.
       */
      _loadValue(options = {}) {
        const fieldName = this.useExtraData ? this.jsonFieldName : _.result(this, 'fieldName');
        return this.model.getDraftField(fieldName, _.defaults({
          useExtraData: this.useExtraData
        }, options));
      }

      /**
       * Save a new value for the field.
       *
       * Args:
       *     value (*):
       *         The new value for the field.
       *
       *     options (SetDraftFieldOptions):
       *         Options for the save operation.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      _saveValue(value, options = {}) {
        return this.model.setDraftField(_.result(this, 'fieldName'), value, _.defaults({
          jsonFieldName: this.jsonFieldName,
          useExtraData: this.useExtraData
        }, options));
      }

      /**
       * Return whether the field has an unsaved editor open.
       *
       * This should be overridden by subclasses, if necessary.
       *
       * Returns:
       *     boolean:
       *     Whether the field is unsaved.
       */
      needsSave() {
        return false;
      }

      /**
       * Finish the field's save operation.
       *
       * This should be overridden by subclasses, if necessary.
       */
      finishSave() {
        // Intentionally left blank.
      }
    }) || _class$o);

    /**
     * A field view for text-based fields.
     */
    let TextFieldView = (_dec2$2 = spina.spina({
      prototypeAttrs: ['autocomplete', 'multiline', 'useEditIconOnly']
    }), _dec2$2(_class2$7 = class TextFieldView extends BaseFieldView {
      /**
       * Autocomplete definitions.
       *
       * This should be overridden by subclasses.
       */
      static autocomplete = null;
      /** Whether the view is multi-line or single line. */
      static multiline = false;
      /**
       * Whether edits should be triggered only by clicking on the icon.
       *
       * If this is true, edits can only be triggered by clicking on the icon.
       * If this is false, clicks on the field itself will also trigger an edit.
       */
      static useEditIconOnly = false;
      /**********************
       * Instance variables *
       **********************/

      /** Whether the field allows Markdown-formatted text. */
      allowRichText = false;

      /** The inline editor view. */

      /** The field name for storing the text type. */

      /**
       * The model attribute for if this field is rich text.
       *
       * This is the name of the attribute which indicates whether the field
       * contains Markdown-formatted text or plain text.
       *
       * Returns:
       *     string:
       *     The name of the model attribute indicating whether the field
       *     contains rich text.
       */
      richTextAttr() {
        return this.allowRichText ? `${_.result(this, 'fieldName')}RichText` : null;
      }

      /**
       * Initialize the view.
       *
       * Args:
       *     options (BaseFieldViewOptions):
       *         Options for the view. See the parent class for details.
       */
      initialize(options) {
        super.initialize(options);
        this.jsonTextTypeFieldName = this.jsonFieldName === 'text' ? 'text_type' : `${this.jsonFieldName}_text_type`;
      }

      /**
       * Return the type to use for the inline editor view.
       *
       * Returns:
       *     function:
       *     The constructor for the inline editor class to instantiate.
       */
      _getInlineEditorClass() {
        return this.allowRichText ? RB.RichTextInlineEditorView : RB.InlineEditorView;
      }

      /**
       * Render the view.
       */
      onInitialRender() {
        if (!this.$el.hasClass('editable')) {
          return;
        }
        const fieldName = _.result(this, 'fieldName');
        const EditorClass = this._getInlineEditorClass();
        const inlineEditorOptions = {
          deferEventSetup: this.autocomplete !== null,
          editIconClass: 'rb-icon rb-icon-edit',
          el: this.$el,
          enabled: this.model.get(this.editableProp),
          fieldLabel: this.fieldLabel,
          formClass: `${this.$el.prop('id')}-editor`,
          hasShortButtons: !this.multiline,
          multiline: this.multiline,
          showRequiredFlag: this.$el.hasClass('required'),
          useEditIconOnly: this.useEditIconOnly
        };
        if (this.allowRichText) {
          _.extend(inlineEditorOptions, {
            fieldName: this.fieldName,
            hasRawValue: true,
            matchHeight: false,
            rawValue: this._loadValue({
              useRawTextValue: true
            }) || '',
            textEditorOptions: {
              minHeight: 0,
              richText: this._loadRichTextValue()
            }
          });
        }
        this.inlineEditorView = new EditorClass(inlineEditorOptions);
        this.inlineEditorView.render();
        this.inlineEditorView.el.addEventListener('startEdit', e => {
          const reviewRequestEditorView = this.reviewRequestEditorView;
          const reviewRequestEditor = reviewRequestEditorView.model;
          if (reviewRequestEditor.hasUnviewedUserDraft) {
            e.preventDefault();
            reviewRequestEditorView.promptToLoadUserDraft();
          }
        });
        this.listenTo(this.inlineEditorView, 'beginEdit', () => this.model.incr('editCount'));
        this.listenTo(this.inlineEditorView, 'resize', () => this.trigger('resize'));
        this.listenTo(this.inlineEditorView, 'cancel', () => {
          this.trigger('resize');
          this.model.decr('editCount');
        });
        this.listenTo(this.inlineEditorView, 'complete', value => {
          this.trigger('resize');
          this.model.decr('editCount');
          const saveOptions = {
            allowMarkdown: this.allowRichText
          };
          if (this.allowRichText) {
            saveOptions.richText = this.inlineEditorView.textEditor.richText;
            saveOptions.jsonTextTypeFieldName = this.jsonTextTypeFieldName;
          }
          this._saveValue(value, saveOptions).then(() => {
            this._formatField();
            this.trigger('fieldSaved');
          }).catch(err => {
            this._formatField();
            this.trigger('fieldError', err.message);
          });
        });
        if (this.autocomplete !== null) {
          this._buildAutoComplete();
          this.inlineEditorView.setupEvents();
        }
        this.listenTo(this.model, `change:${this.editableProp}`, (model, editable) => {
          if (editable) {
            this.inlineEditorView.enable();
          } else {
            this.inlineEditorView.disable();
          }
        });
        this.listenTo(this.model, `fieldChanged:${fieldName}`, this._formatField);
      }

      /**
       * Convert an item to a hyperlink.
       *
       * Args:
       *     item (object):
       *         The item to link. The content is up to the caller.
       *
       *     options (object):
       *         Options to control the linking behavior.
       *
       * Option Args:
       *     cssClass (string, optional):
       *         The optional CSS class to add to the link.
       *
       *     makeItemText (function, optional):
       *         A function that takes the item and returns the text for the
       *         link. If not specified, the item itself will be used as the
       *         text.
       *
       *     makeItemURL (function, optional):
       *         A function that takes the item and returns the URL for the link.
       *         If not specified, the item itself will be used as the URL.
       *
       * Returns:
       *     jQuery:
       *     The resulting link element wrapped in jQuery.
       */
      _convertToLink(item, options = {}) {
        if (!item) {
          return $();
        }
        const $link = $('<a>').attr('href', options.makeItemURL ? options.makeItemURL(item) : item).text(options.makeItemText ? options.makeItemText(item) : item);
        if (options.cssClass) {
          $link.addClass(options.cssClass);
        }
        return $link;
      }

      /**
       * Add auto-complete functionality to the field.
       */
      _buildAutoComplete() {
        const ac = this.autocomplete;
        const reviewRequest = this.model.get('reviewRequest');
        this.inlineEditorView.$field.rbautocomplete({
          cmp: ac.cmp,
          error: xhr => {
            let text;
            try {
              text = JSON.parse(xhr.responseText).err.msg;
            } catch (e) {
              text = `HTTP ${xhr.status} ${xhr.statusText}`;
            }
            alert(text);
          },
          extraParams: ac.extraParams,
          formatItem: data => {
            let s = data[ac.nameKey];
            if (ac.descKey && data[ac.descKey]) {
              s += ` <span>(${_.escape(data[ac.descKey])})</span>`;
            }
            return s;
          },
          matchCase: false,
          multiple: true,
          parse: data => {
            const items = _.isFunction(ac.fieldName) ? ac.fieldName(data) : data[ac.fieldName];
            return items.map(item => {
              if (ac.parseItem) {
                item = ac.parseItem(item);
              }
              return {
                data: item,
                result: item[ac.nameKey],
                value: item[ac.nameKey]
              };
            });
          },
          url: SITE_ROOT + reviewRequest.get('localSitePrefix') + 'api/' + (ac.resourceName || ac.fieldName) + '/',
          width: 350
        }).on('autocompleteshow', () => {
          /*
           * Add the footer to the bottom of the results pane the
           * first time it's created.
           *
           * Note that we may have multiple .ui-autocomplete-results
           * elements, and we don't necessarily know which is tied to
           * this. So, we'll look for all instances that don't contain
           * a footer.
           */
          const resultsPane = $('.ui-autocomplete-results:not(' + ':has(.ui-autocomplete-footer))');
          if (resultsPane.length > 0) {
            $('<div>').addClass('ui-autocomplete-footer').text(gettext("Press Tab to auto-complete.")).appendTo(resultsPane);
          }
        });
      }

      /**
       * Format the contents of the field.
       *
       * This will apply the contents of the model attribute to the field
       * element. If the field defines a ``formatValue`` method, this will use
       * that to do the formatting. Otherwise, the element will just be set to
       * contain the text of the value.
       */
      _formatField() {
        const value = this._loadValue();
        if (_.isFunction(this.formatValue)) {
          this.formatValue(value);
        } else {
          this.$el.text(value);
        }
      }

      /**
       * Return whether the field has an unsaved editor open.
       *
       * Returns:
       *     boolean:
       *     Whether the field is unsaved.
       */
      needsSave() {
        return this.inlineEditorView && this.inlineEditorView.isDirty();
      }

      /**
       * Finish the field's save operation.
       */
      finishSave() {
        const value = this.inlineEditorView.submit({
          preventEvents: true
        });
        if (value) {
          this.trigger('resize');
          this.model.decr('editCount');
          const saveOptions = {
            allowMarkdown: this.allowRichText
          };
          if (this.allowRichText) {
            saveOptions.richText = this.inlineEditorView.textEditor.richText;
            saveOptions.jsonTextTypeFieldName = this.jsonTextTypeFieldName;
          }
          return this._saveValue(value, saveOptions).then(() => {
            this._formatField();
            this.trigger('fieldSaved');
          }).catch(err => {
            this._formatField();
            this.trigger('fieldError', err.message);
          });
        } else {
          return Promise.resolve();
        }
      }

      /**
       * Load the rich text value for the field.
       *
       * This will look up the rich text boolean attribute for built-in
       * fields or the text type information in extra_data, returning
       * whether the field is set to use rich text.
       *
       * Returns:
       *     boolean:
       *     Whether the field is set for rich text. This will be
       *     ``undefined`` if an explicit value isn't stored.
       */
      _loadRichTextValue() {
        if (this.useExtraData) {
          const textTypeFieldName = this.jsonTextTypeFieldName;
          const textType = this.model.getDraftField(textTypeFieldName, {
            useExtraData: true,
            useRawTextValue: true
          });
          if (textType === undefined) {
            return undefined;
          }
          console.assert(textType === 'plain' || textType === 'markdown', `Text type "${textType}" in field "${textTypeFieldName}" ` + `not supported.`);
          return textType === 'markdown';
        } else {
          return this.model.getDraftField(_.result(this, 'richTextAttr'));
        }
      }
    }) || _class2$7);

    /**
     * A field view for multiline text-based fields.
     */
    let MultilineTextFieldView = spina.spina(_class3$5 = class MultilineTextFieldView extends TextFieldView {
      static multiline = true;
      allowRichText = null;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (BaseFieldViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        super.initialize(options);

        /*
         * If this field is coming from an extension which doesn't specify any
         * JS-side version, we need to pull some data out of the markup.
         */
        if (this.allowRichText === null) {
          this.allowRichText = this.$el.data('allow-markdown');
          const reviewRequest = this.model.get('reviewRequest');
          const extraData = reviewRequest.draft.get('extraData');
          const rawValue = this.$el.data('raw-value');
          extraData[this.jsonFieldName] = rawValue !== undefined ? rawValue || '' : this.$el.text();
          this.$el.removeAttr('data-raw-value');
          if (this.allowRichText) {
            extraData[this.jsonTextTypeFieldName] = this.$el.hasClass('rich-text') ? 'markdown' : 'plain';
          }
        }
      }

      /**
       * Linkify a block of text.
       *
       * This turns URLs, /r/#/ paths, and bug numbers into clickable links. It's
       * a wrapper around RB.formatText that handles passing in the bug tracker.
       *
       * Args:
       *     options (object):
       *         Options for the text formatting.
       *
       * Option Args:
       *     newText (string, optional):
       *         The new text to format into the element. If not specified, the
       *         existing contents of the element are used.
       */
      formatText(options = {}) {
        const reviewRequest = this.model.get('reviewRequest');
        options = _.defaults({
          bugTrackerURL: reviewRequest.get('bugTrackerURL'),
          isHTMLEncoded: true
        }, options);
        if (this.allowRichText) {
          options.richText = this._loadRichTextValue();
        }
        RB.formatText(this.$el, options);
        this.$('img').on('load', () => this.trigger('resize'));
      }

      /**
       * Render the view.
       */
      onInitialRender() {
        super.onInitialRender();
        this.formatText();
      }

      /**
       * Format the value into the field.
       *
       * Args:
       *     data (object):
       *         The new value of the field.
       */
      formatValue(data) {
        if (this.allowRichText) {
          this.formatText({
            newText: data
          });
        }
      }
    }) || _class3$5;

    /**
     * A field view for fields that include multiple comma-separated values.
     */
    let CommaSeparatedValuesTextFieldView = spina.spina(_class4$4 = class CommaSeparatedValuesTextFieldView extends TextFieldView {
      static useEditIconOnly = true;

      /**
       * Convert an array of items to a list of hyperlinks.
       *
       * Args:
       *     list (Array);
       *         An array of items. The contents of the item is up to the caller.
       *
       *     options (object):
       *         Options to control the linking behavior.
       *
       * Option Args:
       *     cssClass (string, optional):
       *         The optional CSS class to add for each link.
       *
       *     makeItemText (function, optional):
       *         A function that takes an item and returns the text for the link.
       *         If not specified, the item itself will be used as the text.
       *
       *     makeItemURL (function, optional):
       *         A function that takes an item and returns the URL for the link.
       *         If not specified, the item itself will be used as the URL.
       *
       * Returns:
       *     jQuery:
       *     The resulting link elements in a jQuery list.
       */
      _urlizeList(list, options = {}) {
        let $links = $();
        if (list) {
          for (let i = 0; i < list.length; i++) {
            $links = $links.add(this._convertToLink(list[i], options));
            if (i < list.length - 1) {
              $links = $links.add(document.createTextNode(', '));
            }
          }
        }
        return $links;
      }

      /**
       * Format the value into the field.
       *
       * Args:
       *     data (Array):
       *         The new value of the field.
       */
      formatValue(data) {
        data = data || [];
        this.$el.html(data.join(', '));
      }
    }) || _class4$4;

    /**
     * A field view for checkbox fields.
     */
    let CheckboxFieldView = spina.spina(_class5$4 = class CheckboxFieldView extends BaseFieldView {
      /**
       * Render the field.
       */
      onInitialRender() {
        this.$el.change(() => {
          this._saveValue(this.$el.is(':checked')).then(() => this.trigger('fieldSaved')).catch(err => this.trigger('fieldError', err.message));
        });
      }
    }) || _class5$4;

    /**
     * A field view for dropdown fields.
     */
    let DropdownFieldView = spina.spina(_class6$4 = class DropdownFieldView extends BaseFieldView {
      /**
       * Render the field.
       */
      onInitialRender() {
        super.onInitialRender();
        this.$el.change(() => {
          this._saveValue(this.$el.val()).then(() => this.trigger('fieldSaved')).catch(err => this.trigger('fieldError', err.message));
        });
      }
    }) || _class6$4;

    /**
     * A field view for date fields.
     */
    let DateFieldView = spina.spina(_class7$3 = class DateFieldView extends TextFieldView {
      /**
       * Render the field.
       */
      onInitialRender() {
        super.onInitialRender();
        this.inlineEditorView.$field.datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: $.datepicker.ISO_8601,
          onSelect: (dateText, instance) => {
            if (dateText !== instance.lastVal) {
              this.inlineEditorView._dirty = true;
            }
          },
          showButtonPanel: true
        });
      }

      /**
       * Save a new value for the field.
       *
       * Args:
       *     value (*):
       *         The new value for the field.
       *
       *     options (object):
       *         Options for the save operation.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      _saveValue(value, options = {}) {
        const m = moment(value, 'YYYY-MM-DD', true);
        if (!m.isValid()) {
          value = '';
          this.$el.text('');
        }
        return super._saveValue(value, options);
      }
    }) || _class7$3;

    /**
     * The "Branch" field.
     */
    let BranchFieldView = spina.spina(_class8$2 = class BranchFieldView extends TextFieldView {
      static useExtraData = false;
    }) || _class8$2;

    /**
     * The "Bugs" field.
     */
    let BugsFieldView = spina.spina(_class9$1 = class BugsFieldView extends CommaSeparatedValuesTextFieldView {
      static useExtraData = false;

      /**
       * Format the value into the field.
       *
       * Args:
       *     data (Array):
       *         The new value of the field.
       */
      formatValue(data) {
        data = data || [];
        const reviewRequest = this.model.get('reviewRequest');
        const bugTrackerURL = reviewRequest.get('bugTrackerURL');
        if (bugTrackerURL) {
          this.$el.empty().append(this._urlizeList(data, {
            cssClass: 'bug',
            makeItemURL: item => bugTrackerURL.replace('--bug_id--', item)
          })).find('.bug').bug_infobox();
        } else {
          this.$el.text(data.join(', '));
        }
      }
    }) || _class9$1;

    /**
     * The change description field.
     */
    let ChangeDescriptionFieldView = spina.spina(_class10$1 = class ChangeDescriptionFieldView extends MultilineTextFieldView {
      static useExtraData = false;

      /**********************
       * Instance variables *
       **********************/

      allowRichText = true;
      jsonFieldName = 'changedescription';
    }) || _class10$1;

    /**
     * The commit list field.
     *
     * This provides expand/collapse functionality for commit messages that are
     * more than a single line.
     */
    let CommitListFieldView = spina.spina(_class11$1 = class CommitListFieldView extends BaseFieldView {
      /**********************
       * Instance variables *
       **********************/

      #commitListView = null;

      /**
       * Render the field.
       */
      onInitialRender() {
        super.onInitialRender();

        /*
         * We needn't render the view because it has already been rendered by
         * the server.
         */
        this.#commitListView = new RB.DiffCommitListView({
          el: this.$('.commit-list'),
          model: new RB.DiffCommitList({
            commits: this.model.get('commits'),
            isInterdiff: false
          })
        });
      }
    }) || _class11$1;

    /**
     * The close description field.
     */
    let CloseDescriptionFieldView = spina.spina(_class12$1 = class CloseDescriptionFieldView extends MultilineTextFieldView {
      static editableProp = 'statusEditable';
      static useExtraData = false;

      /**********************
       * Instance variables *
       **********************/

      allowRichText = true;
      /**
       * Save a new value for the field.
       *
       * Args:
       *     value (*):
       *         The new value for the field.
       *
       *     options (object):
       *         Options for the save operation.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      _saveValue(value, options = {}) {
        return this.model.get('reviewRequest').close(_.defaults({
          description: value,
          postData: {
            force_text_type: 'html',
            include_text_types: 'raw'
          },
          type: this.closeType
        }, options));
      }
    }) || _class12$1;

    /**
     * The "Depends On" field.
     */
    let DependsOnFieldView = spina.spina(_class13$1 = class DependsOnFieldView extends CommaSeparatedValuesTextFieldView {
      static autocomplete = {
        cmp: (term, a, b) => b.data.id - a.data.id,
        descKey: 'id',
        display_name: 'summary',
        extraParams: {
          summary: 1
        },
        fieldName: data => data.search.review_requests,
        nameKey: 'id',
        parseItem: item => {
          item.id = item.id.toString();
          item.display_name = item.summary;
          return item;
        },
        resourceName: 'search'
      };
      static useEditIconOnly = true;
      static useExtraData = false;

      /**
       * Format the value into the field.
       *
       * Args:
       *     data (Array):
       *         The new value of the field.
       */
      formatValue(data) {
        data = data || [];
        this.$el.empty().append(this._urlizeList(data, {
          cssClass: 'review-request-link',
          makeItemText: item => item.id,
          makeItemURL: item => item.url
        })).find('.review-request-link').review_request_infobox();
      }
    }) || _class13$1;

    /**
     * The "Description" field.
     */
    let DescriptionFieldView = spina.spina(_class14$1 = class DescriptionFieldView extends MultilineTextFieldView {
      static useExtraData = false;
      allowRichText = true;
    }) || _class14$1;

    /**
     * The "Owner" field.
     */
    let OwnerFieldView = spina.spina(_class15 = class OwnerFieldView extends TextFieldView {
      static autocomplete = {
        cmp: (term, a, b) => {
          /*
           * Sort the results with username matches first (in alphabetical
           * order), followed by real name matches (in alphabetical order).
           */
          const aUsername = a.data.username;
          const bUsername = b.data.username;
          const aFullname = a.data.fullname;
          const bFullname = a.data.fullname;
          if (aUsername.indexOf(term) === 0) {
            if (bUsername.indexOf(term) === 0) {
              return aUsername.localeCompare(bUsername);
            }
            return -1;
          } else if (bUsername.indexOf(term) === 0) {
            return 1;
          } else {
            return aFullname.localeCompare(bFullname);
          }
        },
        descKey: 'fullname',
        extraParams: {
          fullname: 1
        },
        fieldName: 'users',
        nameKey: 'username'
      };
      static useEditIconOnly = true;
      static useExtraData = false;

      /**
       * Format the value into the field.
       *
       * Args:
       *     data (string):
       *         The new value of the field.
       */
      formatValue(data) {
        const $link = this._convertToLink(data, {
          cssClass: 'user',
          makeItemText: item => item.title,
          makeItemURL: item => {
            const href = item.href;
            return href.substr(href.indexOf('/users'));
          }
        });
        this.$el.empty().append($link.user_infobox());
      }
    }) || _class15;

    /**
     * The "Summary" field.
     */
    let SummaryFieldView = spina.spina(_class16 = class SummaryFieldView extends TextFieldView {
      static useExtraData = false;
    }) || _class16;

    /**
     * The "Groups" field.
     */
    let TargetGroupsFieldView = spina.spina(_class17 = class TargetGroupsFieldView extends CommaSeparatedValuesTextFieldView {
      static autocomplete = {
        descKey: 'display_name',
        extraParams: {
          displayname: 1
        },
        fieldName: 'groups',
        nameKey: 'name'
      };
      static useEditIconOnly = true;
      static useExtraData = false;

      /**
       * Format the value into the field.
       *
       * Args:
       *     data (Array):
       *         The new value of the field.
       */
      formatValue(data) {
        data = data || [];
        this.$el.empty().append(this._urlizeList(data, {
          makeItemText: item => item.name,
          makeItemURL: item => item.url
        }));
      }
    }) || _class17;

    /**
     * The "People" field.
     */
    let TargetPeopleFieldView = spina.spina(_class18 = class TargetPeopleFieldView extends CommaSeparatedValuesTextFieldView {
      static autocomplete = {
        cmp: (term, a, b) => {
          /*
           * Sort the results with username matches first (in alphabetical
           * order), followed by real name matches (in alphabetical order).
           */
          const aUsername = a.data.username;
          const bUsername = b.data.username;
          const aFullname = a.data.fullname;
          const bFullname = a.data.fullname;
          if (aUsername.indexOf(term) === 0) {
            if (bUsername.indexOf(term) === 0) {
              return aUsername.localeCompare(bUsername);
            }
            return -1;
          } else if (bUsername.indexOf(term) === 0) {
            return 1;
          } else {
            return aFullname.localeCompare(bFullname);
          }
        },
        descKey: 'fullname',
        extraParams: {
          fullname: 1
        },
        fieldName: 'users',
        nameKey: 'username'
      };
      static useEditIconOnly = true;
      static useExtraData = false;

      /**
       * Format the value into the field.
       *
       * Args:
       *     data (Array):
       *         The new value of the field.
       */
      formatValue(data) {
        data = data || [];
        this.$el.empty().append(this._urlizeList(data, {
          cssClass: 'user',
          makeItemText: item => item.username,
          makeItemURL: item => item.url
        })).find('.user').user_infobox();
      }
    }) || _class18;

    /**
     * The "Testing Done" field.
     */
    let TestingDoneFieldView = spina.spina(_class19 = class TestingDoneFieldView extends MultilineTextFieldView {
      static useExtraData = false;
      allowRichText = true;
    }) || _class19;

    const reviewRequestFieldViews = /*#__PURE__*/Object.defineProperty({
        __proto__: null,
        BaseFieldView,
        BranchFieldView,
        BugsFieldView,
        ChangeDescriptionFieldView,
        CheckboxFieldView,
        CloseDescriptionFieldView,
        CommaSeparatedValuesTextFieldView,
        CommitListFieldView,
        DateFieldView,
        DependsOnFieldView,
        DescriptionFieldView,
        DropdownFieldView,
        MultilineTextFieldView,
        OwnerFieldView,
        SummaryFieldView,
        TargetGroupsFieldView,
        TargetPeopleFieldView,
        TestingDoneFieldView,
        TextFieldView
    }, Symbol.toStringTag, { value: 'Module' });

    var _dec$6, _class$n, _dec2$1, _class2$6, _dec3$1, _class3$4, _dec4$1, _class4$3, _dec5$1, _class5$3, _dec6, _class6$3, _class7$2, _dec7, _class8$1;


    const REVIEW_DOCS_URL = `${MANUAL_URL}users/#reviewing-code-and-documents`;

    /**
     * Base class for displaying a comment in the review dialog.
     */
    let BaseCommentView = (_dec$6 = spina.spina({
      prototypeAttrs: ['editorTemplate', 'thumbnailTemplate']
    }), _dec$6(_class$n = class BaseCommentView extends spina.BaseView {
      static tagName = 'li';
      static events = {
        'click .delete-comment': '_deleteComment'
      };

      /** The template to use for rendering the comment editor. */
      static editorTemplate = _.template(`<div class="edit-fields">
 <div class="edit-field">
  <div class="comment-text-field">
   <label class="comment-label" for="<%= id %>">
    <%- commentText %>
    <a href="#" role="button" class="delete-comment ink-i-delete-item"
       aria-label="<%- deleteCommentText %>"
       title="<%- deleteCommentText %>"
       ></a>
   </label>
   <pre id="<%= id %>" class="reviewtext rich-text"
        data-rich-text="true"><%- text %></pre>
  </div>
 </div>
 <div class="edit-field">
  <input class="issue-opened" id="<%= issueOpenedID %>"
         type="checkbox">
  <label for="<%= issueOpenedID %>"><%- openAnIssueText %></label>
  <% if (showVerify) { %>
   <input class="issue-verify" id="<%= verifyIssueID %>"
          type="checkbox">
   <label for="<%= verifyIssueID %>"><%- verifyIssueText %></label>
  <% } %>
 </div>
</div>`);

      /** The template to use for rendering comment thumbnails. */
      static thumbnailTemplate = null;

      /**********************
       * Instance variables *
       **********************/

      /** The checkbox for whether to open an issue. */
      $issueOpened = null;

      /** The comment editor. */
      $editor = null;

      /** The inline editor. */
      inlineEditorView = null;

      /** The text editor. */
      textEditor = null;

      /** Checkbox for controlling whether issue verification is required. */
      #$issueVerify = null;

      /** Views added by extension hooks. */
      #hookViews = [];

      /** The original state of the comment extra data field. */
      #origExtraData;

      /**
       * Initialize the view.
       */
      initialize(options) {
        this.#origExtraData = _.clone(this.model.get('extraData'));
      }

      /**
       * Remove the view.
       *
       * Returns:
       *     BaseCommentView:
       *     This object, for chaining.
       */
      remove() {
        this.#hookViews.forEach(view => view.remove());
        this.#hookViews = [];
        return super.remove();
      }

      /**
       * Return whether or not the comment needs to be saved.
       *
       * The comment will need to be saved if the inline editor is currently
       * open.
       *
       * Returns:
       *     boolean:
       *     Whether the comment needs to be saved.
       */
      needsSave() {
        return this.inlineEditorView.isDirty() || !_.isEqual(this.model.get('extraData'), this.#origExtraData);
      }

      /**
       * Save the final state of the view.
       *
       * Saves the inline editor and notifies the caller when the model is
       * synced.
       *
       * Args:
       *     options (object):
       *         Options for the model save operation.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      save(options) {
        /*
         * If the inline editor needs to be saved, ask it to do so. This will
         * call this.model.save(). If it does not, just save the model
         * directly.
         */
        return new Promise(resolve => {
          if (this.inlineEditorView.isDirty()) {
            this.model.once('sync', () => resolve());
            this.inlineEditorView.submit();
          } else {
            resolve(this.model.save(_.extend({
              attrs: ['forceTextType', 'includeTextTypes', 'extraData']
            }, options)));
          }
        });
      }

      /**
       * Render the comment view.
       */
      onInitialRender() {
        this.$el.addClass('draft').append(this.renderThumbnail()).append(this.editorTemplate({
          commentText: gettext("Comment"),
          deleteCommentText: gettext("Delete comment"),
          id: _.uniqueId('draft_comment_'),
          issueOpenedID: _.uniqueId('issue-opened'),
          openAnIssueText: gettext("Open an Issue"),
          showVerify: RB.EnabledFeatures.issueVerification,
          text: this.model.get('text'),
          verifyIssueID: _.uniqueId('issue-verify'),
          verifyIssueText: RB.CommentDialogView._verifyIssueText
        })).find('time.timesince').timesince().end();
        this.$issueOpened = this.$('.issue-opened').prop('checked', this.model.get('issueOpened')).change(() => {
          this.model.set('issueOpened', this.$issueOpened.prop('checked'));
          if (!this.model.isNew()) {
            /*
             * We don't save the issueOpened attribute for unsaved
             * models because the comment won't exist yet. If we did,
             * clicking cancel when creating a new comment wouldn't
             * delete the comment.
             */
            this.model.save({
              attrs: ['forceTextType', 'includeTextTypes', 'issueOpened']
            });
          }
        });
        this.#$issueVerify = this.$('.issue-verify').prop('checked', this.model.requiresVerification()).change(() => {
          const extraData = _.clone(this.model.get('extraData'));
          extraData.require_verification = this.#$issueVerify.prop('checked');
          this.model.set('extraData', extraData);
          if (!this.model.isNew()) {
            /*
             * We don't save the extraData attribute for unsaved models
             * because the comment won't exist yet. If we did, clicking
             * cancel when creating a new comment wouldn't delete the
             * comment.
             */
            this.model.save({
              attrs: ['forceTextType', 'includeTextTypes', 'extra_data.require_verification']
            });
          }
        });
        const $editFields = this.$('.edit-fields');
        this.$editor = this.$('pre.reviewtext');
        this.inlineEditorView = new RB.RichTextInlineEditorView({
          editIconClass: 'rb-icon rb-icon-edit',
          el: this.$editor,
          multiline: true,
          notifyUnchangedCompletion: true,
          textEditorOptions: {
            bindRichText: {
              attrName: 'richText',
              model: this.model
            }
          }
        });
        this.inlineEditorView.render();
        this.textEditor = this.inlineEditorView.textEditor;
        this.listenTo(this.inlineEditorView, 'complete', value => {
          const attrs = ['forceTextType', 'includeTextTypes', 'richText', 'text'];
          if (this.model.isNew()) {
            /*
             * If this is a new comment, we have to send whether or not an
             * issue was opened because toggling the issue opened checkbox
             * before it is completed won't save the status to the server.
             */
            attrs.push('extra_data.require_verification', 'issueOpened');
          }
          this.model.set({
            richText: this.textEditor.richText,
            text: value
          });
          this.model.save({
            attrs: attrs
          });
        });
        this.listenTo(this.model, `change:${this._getRawValueFieldsName()}`, this._updateRawValue);
        this._updateRawValue();
        this.listenTo(this.model, 'saved', this.renderText);
        this.renderText();
        this.listenTo(this.model, 'destroying', () => this.stopListening(this.model));
        RB.ReviewDialogCommentHook.each(hook => {
          const HookView = hook.get('viewType');
          const hookView = new HookView({
            extension: hook.get('extension'),
            model: this.model
          });
          this.#hookViews.push(hookView);
          $('<div class="edit-field">').append(hookView.$el).appendTo($editFields);
          hookView.render();
        });
      }

      /**
       * Render the thumbnail for this comment.
       *
       * Returns:
       *     jQuery:
       *     The rendered thumbnail element.
       */
      renderThumbnail() {
        if (this.thumbnailTemplate === null) {
          return null;
        }
        return $(this.thumbnailTemplate(this.model.attributes));
      }

      /**
       * Render the text for this comment.
       */
      renderText() {
        const reviewRequest = this.model.get('parentObject').get('parentObject');
        if (this.$editor) {
          RB.formatText(this.$editor, {
            bugTrackerURL: reviewRequest.get('bugTrackerURL'),
            isHTMLEncoded: true,
            newText: this.model.get('text'),
            richText: this.model.get('richText')
          });
        }
      }

      /**
       * Delete the comment associated with the model.
       */
      _deleteComment() {
        if (confirm(gettext("Are you sure you want to delete this comment?"))) {
          this.model.destroy();
        }
      }

      /**
       * Update the stored raw value of the comment text.
       *
       * This updates the raw value stored in the inline editor as a result of a
       * change to the value in the model.
       */
      _updateRawValue() {
        if (this.$editor) {
          this.inlineEditorView.options.hasRawValue = true;
          this.inlineEditorView.options.rawValue = this.model.get(this._getRawValueFieldsName()).text;
        }
      }

      /**
       * Return the field name for the raw value.
       *
       * Returns:
       *     string:
       *     The field name to use, based on the whether the user wants to use
       *     Markdown or not.
       */
      _getRawValueFieldsName() {
        return RB.UserSession.instance.get('defaultUseRichText') ? 'markdownTextFields' : 'rawTextFields';
      }
    }) || _class$n);
    /**
     * Options for the DiffCommentView.
     *
     * Version Added:
     *     6.0
     */
    /**
     * Displays a view for diff comments.
     */
    let DiffCommentView = (_dec2$1 = spina.spina({
      prototypeAttrs: ['thumbnailTemplate']
    }), _dec2$1(_class2$6 = class DiffCommentView extends BaseCommentView {
      static thumbnailTemplate = _.template(`<div class="rb-c-review-comment-thumbnail">
 <div class="rb-c-review-comment-thumbnail__content"
      id="review_draft_comment_container_<%= id %>">
  <table class="sidebyside loading">
   <thead>
    <tr>
     <th class="filename"><%- revisionText %></th>
    </tr>
   </thead>
   <tbody>
    <% for (var i = 0; i < numLines; i++) { %>
     <tr><td><pre>&nbsp;</pre></td></tr>
    <% } %>
   </tbody>
  </table>
 </div>
</div>`);

      /** The stored view options. */

      /**
       * Initialize the view.
       *
       * Args:
       *     options (DiffCommentViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.options = options;
        super.initialize(options);
      }

      /**
       * Render the comment view.
       *
       * After rendering, this will queue up a load of the diff fragment
       * to display. The view will show a spinner until the fragment has
       * loaded.
       */
      onInitialRender() {
        super.onInitialRender();
        const fileDiffID = this.model.get('fileDiffID');
        const interFileDiffID = this.model.get('interFileDiffID');
        this.options.diffQueue.queueLoad(this.model.id, interFileDiffID ? fileDiffID + '-' + interFileDiffID : fileDiffID);
      }

      /**
       * Render the thumbnail.
       *
       * Returns:
       *     jQuery:
       *     The rendered thumbnail element.
       */
      renderThumbnail() {
        const fileDiff = this.model.get('fileDiff');
        const interFileDiff = this.model.get('interFileDiff');
        let revisionText;
        if (interFileDiff) {
          revisionText = interpolate(gettext("%(filename)s (Diff revisions %(fileDiffRevision)s - %(interFileDiffRevision)s)"), {
            fileDiffRevision: fileDiff.get('sourceRevision'),
            filename: fileDiff.get('destFilename'),
            interfileDiffRevision: interFileDiff.get('sourceRevision')
          }, true);
        } else {
          revisionText = interpolate(gettext("%(filename)s (Diff revision %(fileDiffRevision)s)"), {
            fileDiffRevision: fileDiff.get('sourceRevision'),
            filename: fileDiff.get('destFilename')
          }, true);
        }
        return $(this.thumbnailTemplate({
          id: this.model.get('id'),
          numLines: this.model.getNumLines(),
          revisionText: revisionText
        }));
      }
    }) || _class2$6);

    /**
     * Displays a view for file attachment comments.
     */
    let FileAttachmentCommentView = (_dec3$1 = spina.spina({
      prototypeAttrs: ['thumbnailTemplate']
    }), _dec3$1(_class3$4 = class FileAttachmentCommentView extends BaseCommentView {
      static thumbnailTemplate = _.template(`<div class="rb-c-review-comment-thumbnail">
 <a class="rb-c-review-comment-thumbnail__header"
    href="<%- reviewURL %>">
  <span class="rb-c-review-comment-thumbnail__name"
        href="<%- reviewURL %>"><%-
   linkText
  %></span>
  <span class="rb-c-review-comment-thumbnail__revision"><%-
   revisionsStr
  %></span>
 </a>
 <div class="rb-c-review-comment-thumbnail__content"><%=
  thumbnailHTML
 %></div>
</div>`);

      /**
       * Render the thumbnail.
       *
       * Returns:
       *     jQuery:
       *     The rendered thumbnail element.
       */
      renderThumbnail() {
        const fileAttachment = this.model.get('fileAttachment');
        const diffAgainstFileAttachment = this.model.get('diffAgainstFileAttachment');
        const revision = fileAttachment.get('revision');
        let revisionsStr;
        if (!revision) {
          /* This predates having a revision. Don't show anything. */
          revisionsStr = '';
        } else if (diffAgainstFileAttachment) {
          const revision1 = diffAgainstFileAttachment.get('revision');
          revisionsStr = interpolate(gettext("(Revisions %(revision1)s - %(revision)s)"), {
            "revision1": revision1,
            "revision": revision
          }, true);
        } else {
          revisionsStr = interpolate(gettext("(Revision %(revision)s)"), {
            "revision": revision
          }, true);
        }
        return $(this.thumbnailTemplate(_.defaults({
          revisionsStr: revisionsStr
        }, this.model.attributes)));
      }
    }) || _class3$4);
    /**
     * Displays a view for general comments.
     */
    let GeneralCommentView = (_dec4$1 = spina.spina({
      prototypeAttrs: ['thumbnailTemplate']
    }), _dec4$1(_class4$3 = class GeneralCommentView extends BaseCommentView {
      static thumbnailTemplate = null;
    }) || _class4$3);
    /**
     * Displays a view for screenshot comments.
     */
    let ScreenshotCommentView = (_dec5$1 = spina.spina({
      prototypeAttrs: ['thumbnailTemplate']
    }), _dec5$1(_class5$3 = class ScreenshotCommentView extends BaseCommentView {
      static thumbnailTemplate = _.template(`<div class="rb-c-review-comment-thumbnail">
 <a class="rb-c-review-comment-thumbnail__header"
    href="<%- screenshot.reviewURL %>">
  <span class="rb-c-review-comment-thumbnail__name"><%-
   displayName
  %></span>
 </a>
 <div class="rb-c-review-comment-thumbnail__content">
  <img src="<%- thumbnailURL %>" width="<%- width %>"
       height="<%- height %>" alt="<%- displayName %>">
 </div>
</div>`);

      /**
       * Render the thumbnail.
       *
       * Returns:
       *     jQuery:
       *     The rendered thumbnail element.
       */
      renderThumbnail() {
        const screenshot = this.model.get('screenshot');
        return $(this.thumbnailTemplate(_.defaults({
          displayName: screenshot.getDisplayName(),
          screenshot: screenshot.attributes
        }, this.model.attributes)));
      }
    }) || _class5$3);
    /**
     * Options for the HeaderFooterCommentView.
     *
     * Version Added:
     *     6.0
     */
    /**
     * The header or footer for a review.
     */
    let HeaderFooterCommentView = (_dec6 = spina.spina({
      prototypeAttrs: ['editorTemplate']
    }), _dec6(_class6$3 = class HeaderFooterCommentView extends spina.BaseView {
      static tagName = 'li';
      static events = {
        'click .add-link': 'openEditor'
      };
      static editorTemplate = _.template(`<div class="edit-fields">
 <div class="edit-field">
  <div class="add-link-container">
   <a href="#" class="add-link"><%- linkText %></a>
  </div>
  <div class="comment-text-field">
   <label for="<%= id %>" class="comment-label">
    <%- commentText %>
   </label>
   <pre id="<%= id %>" class="reviewtext rich-text"
        data-rich-text="true"><%- text %></pre>
  </div>
 </div>
</div>`);

      /**********************
       * Instance variables *
       **********************/

      /** The editor element. */
      $editor = null;

      /** The text to show in the label for the comment field. */

      /** The inline editor view. */

      /** The text to show in the "add" link. */

      /** The property name to modify (either ``bodyTop`` or ``bodyBottom``). */

      /** The property name of the rich text field for the content property. */

      /** The text editor view. */
      textEditor = null;

      /** The container element for the editor. */
      #$editorContainer = null;

      /** The container element for the "add" link. */
      #$linkContainer = null;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (HeaderFooterCommentViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.propertyName = options.propertyName;
        this.richTextPropertyName = options.richTextPropertyName;
        this.linkText = options.linkText;
        this.commentText = options.commentText;
      }

      /**
       * Set the text of the link.
       *
       * Args:
       *     linkText (string):
       *         The text to show in the "add" link.
       */
      setLinkText(linkText) {
        this.$('.add-link').text(linkText);
      }

      /**
       * Render the view.
       */
      onInitialRender() {
        const text = this.model.get(this.propertyName);
        this.$el.addClass('draft').append(this.editorTemplate({
          commentText: this.commentText,
          id: this.propertyName,
          linkText: this.linkText,
          text: text || ''
        })).find('time.timesince').timesince().end();
        this.$editor = this.$('pre.reviewtext');
        this.inlineEditorView = new RB.RichTextInlineEditorView({
          editIconClass: 'rb-icon rb-icon-edit',
          el: this.$editor,
          multiline: true,
          notifyUnchangedCompletion: true,
          textEditorOptions: {
            bindRichText: {
              attrName: this.richTextPropertyName,
              model: this.model
            }
          }
        });
        this.inlineEditorView.render();
        this.textEditor = this.inlineEditorView.textEditor;
        this.listenTo(this.inlineEditorView, 'complete', value => {
          this.model.set(this.propertyName, value);
          this.model.set(this.richTextPropertyName, this.textEditor.richText);
          this.model.save({
            attrs: [this.propertyName, this.richTextPropertyName, 'forceTextType', 'includeTextTypes']
          });
        });
        this.listenTo(this.inlineEditorView, 'cancel', () => {
          if (!this.model.get(this.propertyName)) {
            this.#$editorContainer.hide();
            this.#$linkContainer.show();
          }
        });
        this.#$editorContainer = this.$('.comment-text-field');
        this.#$linkContainer = this.$('.add-link-container');
        this.listenTo(this.model, `change:${this._getRawValueFieldsName()}`, this._updateRawValue);
        this._updateRawValue();
        this.listenTo(this.model, 'saved', this.renderText);
        this.renderText();
      }

      /**
       * Render the text for this comment.
       */
      renderText() {
        if (this.$editor) {
          const text = this.model.get(this.propertyName);
          if (text) {
            const reviewRequest = this.model.get('parentObject');
            this.#$editorContainer.show();
            this.#$linkContainer.hide();
            RB.formatText(this.$editor, {
              bugTrackerURL: reviewRequest.get('bugTrackerURL'),
              isHTMLEncoded: true,
              newText: text,
              richText: this.model.get(this.richTextPropertyName)
            });
          } else {
            this.#$editorContainer.hide();
            this.#$linkContainer.show();
          }
        }
      }

      /**
       * Return whether or not the comment needs to be saved.
       *
       * The comment will need to be saved if the inline editor is currently
       * open.
       *
       * Returns:
       *     boolean:
       *     Whether the comment needs to be saved.
       */
      needsSave() {
        return this.inlineEditorView.isDirty();
      }

      /**
       * Save the final state of the view.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      save() {
        return new Promise(resolve => {
          this.model.once('sync', () => resolve());
          this.inlineEditorView.submit();
        });
      }

      /**
       * Open the editor.
       *
       * This is used for the 'Add ...' link handler, as well as for the default
       * state of the dialog when there are no comments.
       *
       * Args:
       *     ev (Event):
       *         The event that triggered the action.
       *
       * Returns:
       *     boolean:
       *     false, always.
       */
      openEditor(ev) {
        this.#$linkContainer.hide();
        this.#$editorContainer.show();
        this.inlineEditorView.startEdit();
        if (ev) {
          ev.preventDefault();
        }
        return false;
      }

      /**
       * Delete the comment.
       *
       * This is a no-op, since headers and footers can't be deleted.
       */
      _deleteComment() {}

      /**
       * Update the stored raw value of the comment text.
       *
       * This updates the raw value stored in the inline editor as a result of a
       * change to the value in the model.
       */
      _updateRawValue() {
        if (this.$editor) {
          const rawValues = this.model.get(this._getRawValueFieldsName());
          this.inlineEditorView.options.hasRawValue = true;
          this.inlineEditorView.options.rawValue = rawValues[this.propertyName];
        }
      }

      /**
       * Return the field name for the raw value.
       *
       * Returns:
       *     string:
       *     The field name to use, based on the whether the user wants to use
       *     Markdown or not.
       */
      _getRawValueFieldsName() {
        return RB.UserSession.instance.get('defaultUseRichText') ? 'markdownTextFields' : 'rawTextFields';
      }
    }) || _class6$3);
    /**
     * View to show tips to the user about creating reviews.
     *
     * Version Added:
     *     6.0
     */
    let TipsSlideshowView = spina.spina(_class7$2 = class TipsSlideshowView extends RB.SlideshowView {
      static className = 'ink-c-alert';
      static template = `<div class="rb-c-slideshow -is-auto-cycled">
 <span class="rb-c-alert__close"
       role="button"
       aria-label="${gettext("Close")}"
       title="${gettext("Close")}"
       tabindex="0"></span>
 <div class="rb-c-alert__content">
  <div class="rb-c-alert__heading">
   <nav class="rb-c-slideshow__nav">
    <label for="">${gettext("Tip:")}</label>
    <a class="rb-c-slideshow__nav-prev"
       href="#"
       role="button"
       aria-label="${gettext("Previous")}"
       title="${gettext("Previous")}">
     <span class="fa fa-caret-left"></span>
    </a>
    <a class="rb-c-slideshow__nav-next"
       href="#"
       role="button"
       aria-label="${gettext("Next")}"
       title="${gettext("Next")}">
     <span class="fa fa-caret-right"></span>
    </a>
   </nav>
  </div>
  <ul class="rb-c-slideshow__slides">
  </ul>
 </div>
</div>`;
      #tips = [gettext("To add a comment to a code change or text file attachment, click on a line number or click and drag over multiple line numbers in the diff viewer. You'll be able to see and edit the comment from both the diff viewer and here in the review dialog."), gettext("When reviewing image file attachments, add comments by clicking and dragging out a region."), gettext("To add comments that aren't tied to a specific code change or file attachment, click on the \"Add General Comment\" button at the bottom of the review dialog or in the Review menu. This is useful for comments that apply to the review request as a whole or for ones that don't refer to any specific areas."), gettext("For file attachments that don't have a review interface, you can add a comment through the \"Add Comment\" button when hovering over the file attachment. The comment can then be seen and edited here in the review dialog."), gettext("Until you publish your review, your review and any comments in it are only visible to you and can be edited freely. After you publish, your review will be visible to others on the review request and you won't be able to edit it anymore."), gettext("Use a \"Ship It!\" in your review to show your approval for a review request. This can be toggled at the top of this review dialog, or you can quickly post a \"Ship It!\" review with no other content in it by clicking on the \"Ship It!\" action in the Review menu."), gettext("The optional header and footer fields can be useful for providing a summary or conclusion for your review, or for encouraging remarks."), interpolate(gettext("For more information on reviewing code and documents, visit our <a href=\"%(REVIEW_DOCS_URL)s\">documentation</a>."), {
        "REVIEW_DOCS_URL": REVIEW_DOCS_URL
      }, true)];
      static events = {
        'click .rb-c-alert__close': '_onCloseClicked'
      };

      /**
       * Render the view.
       */
      onInitialRender() {
        this.$el.html(TipsSlideshowView.template).attr({
          'aria-label': gettext("Tips"),
          'aria-roledescription': 'carousel',
          'data-type': 'info'
        });
        const $slides = this.$('.rb-c-slideshow__slides');
        const li = `<li class="rb-c-slideshow__slide"
    role="group"
    aria-hidden="false"
    aria-roledescription="slide">`;
        for (const tip of this.#tips) {
          $(li).html(tip).appendTo($slides);
        }
        super.onInitialRender();
      }

      /**
       * Handler for when the close icon is clicked.
       *
       * Args:
       *     ev (JQuery.ClickEvent):
       *         The event.
       */
      _onCloseClicked(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.trigger('hide');
      }
    }) || _class7$2;
    /**
     * Options for the ReviewDialogView.
     *
     * Version Added:
     *     6.0
     */
    /**
     * Options for creating the ReviewDialogView.
     *
     * Version Added:
     *     6.0
     */
    /**
     * Creates a dialog for modifying a draft review.
     *
     * This provides editing capabilities for creating or modifying a new
     * review. The list of comments are retrieved from the server, providing
     * context for the comments.
     */
    let ReviewDialogView = (_dec7 = spina.spina({
      prototypeAttrs: ['template']
    }), _dec7(_class8$1 = class ReviewDialogView extends spina.BaseView {
      static id = 'review-form-comments';
      static className = 'review';
      static template = _.template(`<div class="edit-field">
 <input id="id_shipit" type="checkbox">
 <label for="id_shipit"><%- shipItText %></label>
</div>
<div class="review-dialog-hooks-container"></div>
<div class="edit-field body-top"></div>
<ol id="review-dialog-body-top-comments" class="review-comments"></ol>
<ol id="review-dialog-general-comments" class="review-comments"></ol>
<ol id="review-dialog-screenshot-comments"
    class="review-comments"></ol>
<ol id="review-dialog-file-attachment-comments"
    class="review-comments"></ol>
<ol id="review-dialog-diff-comments" class="review-comments"></ol>
<ol id="review-dialog-body-bottom-comments"
    class="review-comments"></ol>
<div class="spinner"><span class="ink-c-spinner"></span></div>
<div class="edit-field body-bottom"></div>`);

      /** The review dialog instance. */
      static instance = null;

      /**
       * Create the review dialog.
       *
       * Args:
       *     options (ReviewDialogViewOptions):
       *         Options for the dialog.
       *
       * Returns:
       *     ReviewDialogView:
       *     The new dialog instance.
       */
      static create(options) {
        console.assert(!this.instance, 'A ReviewDialogView is already opened');
        console.assert(options.review, 'A review must be specified');
        const dialog = new this({
          container: options.container,
          model: options.review,
          reviewRequestEditor: options.reviewRequestEditor
        });
        this.instance = dialog;
        dialog.render();
        dialog.on('closed', () => {
          this.instance = null;
        });
        return dialog;
      }

      /**********************
       * Instance variables *
       **********************/

      /** The view options. */

      /** The elements for the diff comment views. */
      #$diffComments = $();

      /** The dialog element. */
      #$dlg = null;

      /** The elements for the file attachment comment views. */
      #$fileAttachmentComments = $();

      /** The elements for the general comment views. */
      #$generalComments = $();

      /** The elements for the screenshot comment views. */
      #$screenshotComments = $();

      /** The default for whether to use rich text (Markdown). */
      #defaultUseRichText;

      /** The queue for loading diff fragments. */
      #diffQueue;

      /** The set of additional views added by extension hooks. */
      #hookViews = [];

      /** The publish button. */
      #publishButton = null;

      /** Additional data to send when calling this.model.ready(). */
      #queryData;

      /** The buttons for the dialog. */
      _$buttons = null;

      /** The "ship it" checkbox. */
      _$shipIt = null;

      /** The loading spinner. */
      _$spinner = null;

      /** The view for the review header editor. */

      /** The view for the review footer editor. */

      /** The set of views for all comments. */
      _commentViews = [];

      /** The collection of diff comments. */

      /** The collection of file attachment comments. */

      /** The collection of general comments. */

      /** The collection of screenshot comments. */

      /** The link to show the tips carousel when hidden. */
      #showTips = null;

      /** The carousel showing tips for creating reviews. */
      #tipsView = null;

      /**
       * Initialize the review dialog.
       *
       * Args:
       *     options (ReviewDialogViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.options = options;
        const reviewRequest = this.model.get('parentObject');
        this.#diffQueue = new RB.DiffFragmentQueueView({
          containerPrefix: 'review_draft_comment_container',
          queueName: 'review_draft_diff_comments',
          reviewRequestPath: reviewRequest.get('reviewURL')
        });
        this._diffCommentsCollection = new RB.ResourceCollection([], {
          extraQueryData: {
            'order-by': 'filediff,first_line'
          },
          model: RB.DiffComment,
          parentResource: this.model
        });
        this._bodyTopView = new HeaderFooterCommentView({
          commentText: gettext("Header"),
          linkText: gettext("Add header"),
          model: this.model,
          propertyName: 'bodyTop',
          richTextPropertyName: 'bodyTopRichText'
        });
        this._bodyBottomView = new HeaderFooterCommentView({
          commentText: gettext("Footer"),
          linkText: gettext("Add footer"),
          model: this.model,
          propertyName: 'bodyBottom',
          richTextPropertyName: 'bodyBottomRichText'
        });
        this.listenTo(this._diffCommentsCollection, 'add', comment => {
          const view = new DiffCommentView({
            diffQueue: this.#diffQueue,
            model: comment
          });
          this._renderComment(view, this.#$diffComments);
        });
        this._fileAttachmentCommentsCollection = new RB.ResourceCollection([], {
          model: RB.FileAttachmentComment,
          parentResource: this.model
        });
        this.listenTo(this._fileAttachmentCommentsCollection, 'add', comment => {
          const view = new FileAttachmentCommentView({
            model: comment
          });
          this._renderComment(view, this.#$fileAttachmentComments);
        });
        this._generalCommentsCollection = new RB.ResourceCollection([], {
          model: RB.GeneralComment,
          parentResource: this.model
        });
        this.listenTo(this._generalCommentsCollection, 'add', comment => {
          const view = new GeneralCommentView({
            model: comment
          });
          this._renderComment(view, this.#$generalComments);
        });
        this._screenshotCommentsCollection = new RB.ResourceCollection([], {
          model: RB.ScreenshotComment,
          parentResource: this.model
        });
        this.listenTo(this._screenshotCommentsCollection, 'add', comment => {
          const view = new ScreenshotCommentView({
            model: comment
          });
          this._renderComment(view, this.#$screenshotComments);
        });
        this.#defaultUseRichText = RB.UserSession.instance.get('defaultUseRichText');
        this.#queryData = {
          'force-text-type': 'html'
        };
        if (this.#defaultUseRichText) {
          this.#queryData['include-text-types'] = 'raw,markdown';
        } else {
          this.#queryData['include-text-types'] = 'raw';
        }
        this._setTextTypeAttributes(this.model);
        this.options.reviewRequestEditor.incr('editCount');
      }

      /**
       * Remove the dialog from the DOM.
       *
       * This will remove all the extension hook views from the dialog,
       * and then remove the dialog itself.
       *
       * Returns:
       *     ReviewDialogView:
       *     This object, for chaining.
       */
      remove() {
        if (this.#publishButton) {
          this.#publishButton.remove();
          this.#publishButton = null;
        }
        this.#hookViews.forEach(view => view.remove());
        this.#hookViews = [];
        return super.remove();
      }

      /**
       * Close the review dialog.
       *
       * The dialog will be removed from the screen, and the "closed"
       * event will be triggered.
       */
      close() {
        this.options.reviewRequestEditor.decr('editCount');
        this.#$dlg.modalBox('destroy');
        this.trigger('closed');
        this.remove();
      }

      /**
       * Render the dialog.
       *
       * The dialog will be shown on the screen, and the comments from
       * the server will begin loading and rendering.
       */
      onInitialRender() {
        this.$el.html(this.template({
          addFooterText: gettext("Add footer"),
          addHeaderText: gettext("Add header"),
          markdownDocsURL: MANUAL_URL + 'users/markdown/',
          markdownText: gettext("Markdown Reference"),
          shipItText: gettext("Ship It")
        }));
        this.#$diffComments = this.$('#review-dialog-diff-comments');
        this.#$fileAttachmentComments = this.$('#review-dialog-file-attachment-comments');
        this.#$generalComments = this.$('#review-dialog-general-comments');
        this.#$screenshotComments = this.$('#review-dialog-screenshot-comments');
        this._$spinner = this.$('.spinner');
        this._$shipIt = this.$('#id_shipit');
        const $hooksContainer = this.$('.review-dialog-hooks-container');
        this.#tipsView = new TipsSlideshowView({
          autoCycleTimeMS: 5000
        });
        this.#tipsView.render();
        this.#tipsView.$el.hide().prependTo(this.$el);
        this.listenTo(this.#tipsView, 'hide', () => {
          RB.UserSession.instance.set('showReviewDialogTips', false);
          this.#updateTipsVisibility(false);
        });
        this.#showTips = $('<a href="#" id="show-review-tips" role="button">').text(gettext("Show tips")).hide().prependTo(this.$el).click(e => {
          e.stopPropagation();
          e.preventDefault();
          this.#updateTipsVisibility(true);
          RB.UserSession.instance.set('showReviewDialogTips', true);
        });
        this.#updateTipsVisibility(RB.UserSession.instance.get('showReviewDialogTips'));
        RB.ReviewDialogHook.each(hook => {
          const HookView = hook.get('viewType');
          const hookView = new HookView({
            extension: hook.get('extension'),
            model: this.model
          });
          this.#hookViews.push(hookView);
          $hooksContainer.append(hookView.$el);
          hookView.render();
        });
        this._bodyTopView.$el.appendTo(this.$('#review-dialog-body-top-comments'));
        this._bodyBottomView.$el.appendTo(this.$('#review-dialog-body-bottom-comments'));

        /*
         * Even if the model is already loaded, we may not have the right text
         * type data. Force it to reload.
         */
        this.model.set('loaded', false);
        this.model.ready({
          data: this.#queryData
        }).then(() => {
          this._renderDialog();
          this._bodyTopView.render();
          this._bodyBottomView.render();
          if (this.model.isNew() || this.model.get('bodyTop') === '') {
            this._bodyTopView.openEditor();
          }
          if (this.model.isNew()) {
            this._$spinner.remove();
            this._$spinner = null;
            this._handleEmptyReview();
            this.trigger('loadCommentsDone');
          } else {
            this._$shipIt.prop('checked', this.model.get('shipIt'));
            this._loadComments();
          }
          this.listenTo(this.model, 'change:bodyBottom', this._handleEmptyReview);
        });
      }

      /**
       * Load the comments from the server.
       *
       * This will begin chaining together the loads of each set of
       * comment types. Each loaded comment will be rendered to the
       * dialog once loaded.
       */
      async _loadComments() {
        const collections = [this._screenshotCommentsCollection, this._fileAttachmentCommentsCollection, this._diffCommentsCollection];
        if (RB.EnabledFeatures.generalComments) {
          /*
           * Prepend the General Comments so they're fetched and shown
           * first.
           */
          collections.unshift(this._generalCommentsCollection);
        }
        const loadCollections = collections.map(async collection => {
          await collection.fetchAll({
            data: this.#queryData
          });
          if (collection === this._diffCommentsCollection) {
            this.#diffQueue.loadFragments();
          }
        });
        try {
          await Promise.all(loadCollections);
          this._$spinner.remove();
          this._$spinner = null;
          this._handleEmptyReview();
          this.trigger('loadCommentsDone');
        } catch (err) {
          alert(err.message); // TODO: provide better output.
        }
      }

      /**
       * Properly set the view when the review is empty.
       */
      _handleEmptyReview() {
        /*
         * We only display the bottom textarea if we have comments or the user
         * has previously set the bottom textarea -- we don't want the user to
         * not be able to remove their text.
         */
        if (this._commentViews.length === 0 && !this.model.get('bodyBottom')) {
          this._bodyBottomView.$el.hide();
          this._bodyTopView.setLinkText(gettext("Add text"));
        }
      }

      /**
       * Render a comment to the dialog.
       *
       * Args:
       *     view (BaseCommentView):
       *         The view to render.
       *
       *     $container (jQuery):
       *         The container to add the view to.
       */
      _renderComment(view, $container) {
        this._setTextTypeAttributes(view.model);
        this._commentViews.push(view);
        this.listenTo(view.model, 'destroyed', () => {
          view.$el.fadeOut({
            complete: () => {
              view.remove();
              this._handleEmptyReview();
            }
          });
          this._commentViews = _.without(this._commentViews, view);
        });
        $container.append(view.$el);
        view.render();
        this.#$dlg.scrollTop(view.$el.position().top + this.#$dlg.getExtents('p', 't'));
      }

      /**
       * Render the dialog.
       *
       * This will create and render a dialog to the screen, adding
       * this view's element as the child.
       */
      _renderDialog() {
        const leftButtonsEl = ink.craftComponent("div", {
          "class": "review-dialog-buttons-left"
        }, ink.craftComponent("Ink.Button", {
          ariaLabel: gettext("Add a new general comment to the review"),
          onClick: () => this.#onAddCommentClicked()
        }, gettext("Add General Comment")));
        const menuItems = new ink.MenuItemsCollection([{
          label: gettext("... and only e-mail the owner"),
          onClick: () => {
            this._saveReview(true, {
              publishToOwnerOnly: true
            });
          }
        }, {
          label: gettext("... and archive the review request"),
          onClick: () => {
            this._saveReview(true, {
              publishAndArchive: true
            });
          }
        }]);
        const publishButton = ink.craftComponent("Ink.MenuButton", {
          hasActionButton: true,
          label: gettext("Publish Review"),
          menuAriaLabel: gettext("More publishing options"),
          menuItems: menuItems,
          onActionButtonClick: () => this._saveReview(true),
          type: "primary"
        });
        const rightButtonsEl = ink.craftComponent("div", {
          "class": "review-dialog-buttons-right"
        }, publishButton, ink.craftComponent("Ink.Button", {
          onClick: () => this._onDiscardClicked(),
          type: "danger"
        }, gettext("Discard Review")), ink.craftComponent("Ink.Button", {
          onClick: () => this._saveReview(false)
        }, gettext("Close")));
        this.#publishButton = publishButton;
        const reviewRequest = this.model.get('parentObject');
        this.#$dlg = $('<div>').attr('id', 'review-form').append(this.$el).modalBox({
          boxID: 'review-form-modalbox',
          buttons: [leftButtonsEl, rightButtonsEl],
          container: this.options.container || 'body',
          stretchX: true,
          stretchY: true,
          title: interpolate(gettext("Review for: %(value1)s"), {
            "value1": reviewRequest.get('summary')
          }, true)
        }).on('close', () => this._saveReview(false)).attr('scrollTop', 0).trigger('ready');

        /* Must be done after the dialog is rendered. */

        this._$buttons = this.#$dlg.modalBox('buttons');
      }

      /**
       * Handle a click on the "Add Comment" button.
       *
       * Returns:
       *     boolean:
       *     This always returns false to indicate that the dialog should not
       *     close.
       */
      #onAddCommentClicked() {
        const comment = this.model.createGeneralComment(undefined, RB.UserSession.instance.get('commentsOpenAnIssue'));
        this._generalCommentsCollection.add(comment);
        this._bodyBottomView.$el.show();
        this._commentViews[this._commentViews.length - 1].inlineEditorView.startEdit();
        return false;
      }

      /**
       * Handle a click on the "Discard Review" button.
       *
       * Prompts the user to confirm that they want the review discarded.
       * If they confirm, the review will be discarded.
       *
       * Returns:
       *     boolean:
       *     This always returns false to indicate that the dialog should not
       *     close.
       */
      _onDiscardClicked() {
        const cancelButtonEl = ink.paintComponent("Ink.Button", null, gettext("Cancel"));
        const discardButtonEl = ink.paintComponent("Ink.Button", {
          type: "danger",
          onClick: async () => {
            $dlg.modalBox('destroy');
            this.close();
            await this.model.destroy();
            RB.ClientCommChannel.getInstance().reload();
            if (!RB.EnabledFeatures.unifiedBanner) {
              RB.DraftReviewBannerView.instance.hideAndReload();
            }
          }
        }, gettext("Discard"));
        const $dlg = $('<p>').text(gettext("If you discard this review, all related comments will be permanently deleted.")).modalBox({
          buttons: [cancelButtonEl, discardButtonEl],
          title: gettext("Are you sure you want to discard this review?")
        }).on('close', () => $dlg.modalBox('destroy'));
        return false;
      }

      /**
       * Save the review.
       *
       * First, this loops over all the comment editors and saves any which are
       * still in the editing phase.
       *
       * Args:
       *     publish (boolean):
       *         Whether the review should be published.
       *
       *     options (object):
       *         Options for the model save operation.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete.
       */
      async _saveReview(publish, options = {}) {
        if (publish && options.publishToOwnerOnly) {
          this.model.set('publishToOwnerOnly', true);
        }
        if (publish && options.publishAndArchive) {
          this.model.set('publishAndArchive', true);
        }
        this._$buttons.prop('disabled');
        let madeChanges = false;
        try {
          if (this._bodyTopView.needsSave()) {
            madeChanges = true;
            await this._bodyTopView.save();
          }
          if (this._bodyBottomView.needsSave()) {
            madeChanges = true;
            await this._bodyBottomView.save();
          }
          for (const view of this._commentViews) {
            if (view.needsSave()) {
              madeChanges = true;
              await view.save();
            }
          }
          const shipIt = this._$shipIt.prop('checked');
          const saveFunc = publish ? this.model.publish : this.model.save;
          if (this.model.get('public') !== publish || this.model.get('shipIt') !== shipIt) {
            madeChanges = true;
            this.model.set({
              shipIt: shipIt
            });
            await saveFunc.call(this.model, {
              attrs: ['forceTextType', 'includeTextTypes', 'public', 'publishAndArchive', 'publishToOwnerOnly', 'shipIt']
            });
          }
          this.close();
          if (RB.EnabledFeatures.unifiedBanner) {
            if (publish) {
              // Reload the page.
              RB.navigateTo(this.model.get('parentObject').get('reviewURL'));
            }
          } else {
            const reviewBanner = RB.DraftReviewBannerView.instance;
            if (reviewBanner) {
              if (publish) {
                reviewBanner.hideAndReload();
              } else if (this.model.isNew() && !madeChanges) {
                reviewBanner.hide();
              } else {
                reviewBanner.show();
              }
            }
          }
        } catch (err) {
          console.error('Failed to save review', err);
          this.model.set({
            public: false,
            publishAndArchive: false,
            publishToOwnerOnly: false
          });
          alert(err.message);
        }
      }

      /**
       * Set the text attributes on a model for forcing and including types.
       *
       * Args:
       *     model (Backbone.Model):
       *         The model to set the text type attributes on.
       */
      _setTextTypeAttributes(model) {
        model.set({
          forceTextType: 'html',
          includeTextTypes: this.#defaultUseRichText ? 'raw,markdown' : 'raw'
        });
      }

      /**
       * Update the visibility of the tips box.
       *
       * Args:
       *     show (boolean):
       *         Whether to show the tips.
       */
      #updateTipsVisibility(show) {
        this.#tipsView.$el.toggle(show);
        this.#showTips.toggle(!show);
      }
    }) || _class8$1);

    var _class$m, _class2$5, _class3$3, _class4$2, _class5$2, _class6$2, _class7$1, _class8, _class9, _class10, _class11, _class12, _class13, _class14;

    /**
     * The view to manage the archive menu.
     *
     * Version Added:
     *     6.0
     */
    let ArchiveMenuActionView = spina.spina(_class$m = class ArchiveMenuActionView extends RB.Actions.MenuActionView {
      static events = {
        'click': 'onClick',
        'focusout': 'onFocusOut',
        'keydown': 'onKeyDown',
        'keyup': 'onKeyUp',
        'mouseenter': 'openMenu',
        'mouseleave': 'closeMenu',
        'touchend .menu-title': 'onTouchEnd'
      };

      /**********************
       * Instance variables *
       **********************/
      #activationKeyDown = false;
      #reviewRequest;

      /**
       * Initialize the view.
       */
      initialize() {
        super.initialize();
        const page = RB.PageManager.getPage();
        const reviewRequestEditor = page.getReviewRequestEditorModel();
        this.#reviewRequest = reviewRequestEditor.get('reviewRequest');
        this.listenTo(this.#reviewRequest, 'change:visibility', this.render);
      }

      /**
       * Render the view.
       */
      onRender() {
        super.onRender();
        const visibility = this.#reviewRequest.get('visibility');
        const visible = visibility === RB.ReviewRequest.VISIBILITY_VISIBLE;
        this.$('.rb-icon').toggleClass('rb-icon-archive-on', !visible).toggleClass('rb-icon-archive-off', visible).attr('title', visible ? gettext("Unarchive review request") : gettext("Archive review request"));
      }

      /**
       * Handle a click event.
       *
       * Args:
       *     e (MouseEvent):
       *         The event object.
       */
      async onClick(e) {
        if (!this.#activationKeyDown) {
          e.preventDefault();
          e.stopPropagation();
          const visibility = this.#reviewRequest.get('visibility');
          const visible = visibility === RB.ReviewRequest.VISIBILITY_VISIBLE;
          const collection = visibility === RB.ReviewRequest.VISIBILITY_MUTED ? RB.UserSession.instance.mutedReviewRequests : RB.UserSession.instance.archivedReviewRequests;
          if (visible) {
            await collection.addImmediately(this.#reviewRequest);
          } else {
            await collection.removeImmediately(this.#reviewRequest);
          }
          this.#reviewRequest.set('visibility', visible ? RB.ReviewRequest.VISIBILITY_ARCHIVED : RB.ReviewRequest.VISIBILITY_VISIBLE);
        }
      }

      /**
       * Handle a keydown event.
       *
       * We use this to track whether the activation keys are being pressed
       * (Enter or Space) so that we can avoid triggering the default click
       * behavior, which is a shortcut to the archive functionality.
       *
       * Args:
       *     e (KeyboardEvent):
       *         The event object.
       */
      onKeyDown(e) {
        if (e.key === 'Enter' || e.key === 'Space') {
          this.#activationKeyDown = true;
        }
        super.onKeyDown(e);
      }

      /**
       * Handle a keyup event.
       */
      onKeyUp() {
        this.#activationKeyDown = false;
      }

      /**
       * Handle a touchstart event.
       */
      onTouchStart() {
        // Do nothing.
      }

      /**
       * Handle a touchend event.
       *
       * Args:
       *     e (TouchEvent):
       *         The event object.
       */
      onTouchEnd(e) {
        /*
         * With mouse clicks, we allow users to click on the menu header itself
         * as a shortcut for just choosing archive, but with touch events we
         * can't do that because then the user would never have access to the
         * menu.
         *
         * If we allow this event to run the default handler, it would also
         * give us a 'click' event after.
         */
        e.preventDefault();
        if (this.menu.isOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }
    }) || _class$m;

    /**
     * Base class for archive views.
     *
     * Version Added:
     *     6.0
     */
    let BaseVisibilityActionView = spina.spina(_class2$5 = class BaseVisibilityActionView extends RB.Actions.MenuItemActionView {
      /**********************
       * Instance variables *
       **********************/

      /** The collection to use for making changes to the visibility. */

      /** The visibility type controlled by this action. */
      visibilityType = RB.ReviewRequest.VISIBILITY_ARCHIVED;
      #reviewRequest;

      /**
       * Initialize the view.
       */
      initialize() {
        super.initialize();
        const page = RB.PageManager.getPage();
        const reviewRequestEditor = page.getReviewRequestEditorModel();
        this.#reviewRequest = reviewRequestEditor.get('reviewRequest');
        this.listenTo(this.#reviewRequest, 'change:visibility', this.render);
      }

      /**
       * Render the view.
       *
       * Returns:
       *     BaseVisibilityActionView:
       *     This object, for chaining.
       */
      onRender() {
        this.model.set('label', this.getLabel(this.#reviewRequest.get('visibility')));
      }

      /**
       * Return the label to use for the menu item.
       *
       * Args:
       *     visibility (number):
       *         The visibility state of the review request.
       *
       * Returns:
       *     string:
       *     The label to show based on the current visibility state.
       */
      getLabel(visibility) {
        console.assert(false, 'Not reached.');
        return null;
      }

      /**
       * Toggle the archive state of the review request.
       */
      async activate() {
        const visibility = this.#reviewRequest.get('visibility');
        const visible = visibility !== this.visibilityType;
        if (visible) {
          await this.collection.addImmediately(this.#reviewRequest);
        } else {
          await this.collection.removeImmediately(this.#reviewRequest);
        }
        this.#reviewRequest.set('visibility', visible ? this.visibilityType : RB.ReviewRequest.VISIBILITY_VISIBLE);
      }
    }) || _class2$5;
    /**
     * Archive action view.
     *
     * Version Added:
     *     6.0
     */
    let ArchiveActionView = spina.spina(_class3$3 = class ArchiveActionView extends BaseVisibilityActionView {
      /**********************
       * Instance variables *
       **********************/

      /** The collection to use for making changes to the visibility. */
      collection = RB.UserSession.instance.archivedReviewRequests;

      /**
       * Return the label to use for the menu item.
       *
       * Args:
       *     visibility (number):
       *         The visibility state of the review request.
       *
       * Returns:
       *     string:
       *     The text to use for the label.
       */
      getLabel(visibility) {
        return visibility === this.visibilityType ? gettext("Unarchive") : gettext("Archive");
      }
    }) || _class3$3;

    /**
     * Mute action view.
     *
     * Version Added:
     *     6.0
     */
    let MuteActionView = spina.spina(_class4$2 = class MuteActionView extends BaseVisibilityActionView {
      /**********************
       * Instance variables *
       **********************/

      /** The collection to use for making changes to the visibility. */
      collection = RB.UserSession.instance.mutedReviewRequests;

      /** The visibility type controlled by this action. */
      visibilityType = RB.ReviewRequest.VISIBILITY_MUTED;

      /**
       * Return the label to use for the menu item.
       *
       * Args:
       *     visibility (number):
       *         The visibility state of the review request.
       *
       * Returns:
       *     string:
       *     The text to use for the label.
       */
      getLabel(visibility) {
        return visibility === this.visibilityType ? gettext("Unmute") : gettext("Mute");
      }
    }) || _class4$2;

    /**
     * Action view to create a blank review.
     *
     * Version Added:
     *     6.0
     */
    let CreateReviewActionView = spina.spina(_class5$2 = class CreateReviewActionView extends RB.Actions.MenuItemActionView {
      /**********************
       * Instance variables *
       **********************/

      #pendingReview;
      #reviewRequestEditor;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (object):
       *         Options to pass through to the parent class.
       */
      initialize(options) {
        super.initialize(options);
        const page = RB.PageManager.getPage();
        this.#pendingReview = page.pendingReview;
        this.#reviewRequestEditor = page.reviewRequestEditorView.model;
      }

      /**
       * Render the action.
       *
       * Returns:
       *     CreateReviewActionView:
       *     This object, for chaining.
       */
      onInitialRender() {
        this.listenTo(this.#pendingReview, 'saved destroy sync', this.#update);
        this.#update();
      }

      /**
       * Update the visibility state of the action.
       *
       * This will show the action only when there's no existing pending review.
       */
      #update() {
        this.$el.parent().toggle(this.#pendingReview.isNew());
      }

      /**
       * Handle activation of the action.
       */
      activate() {
        this.#pendingReview.save().then(() => {
          ReviewDialogView.create({
            review: this.#pendingReview,
            reviewRequestEditor: this.#reviewRequestEditor
          });
        });
      }
    }) || _class5$2;

    /**
     * Action view to pop up the edit review dialog.
     *
     * Version Added:
     *     6.0
     */
    let EditReviewActionView = spina.spina(_class6$2 = class EditReviewActionView extends RB.Actions.MenuItemActionView {
      /**********************
       * Instance variables *
       **********************/

      #pendingReview;
      #reviewRequestEditor;

      /**
       * Create the view.
       *
       * Args:
       *     options (object):
       *         Options to pass through to the parent class.
       */
      initialize(options) {
        super.initialize(options);
        const page = RB.PageManager.getPage();
        this.#pendingReview = page.pendingReview;
        this.#reviewRequestEditor = page.reviewRequestEditorView.model;
      }

      /**
       * Render the action.
       */
      onInitialRender() {
        this.listenTo(this.#pendingReview, 'saved destroy sync', this.#update);
        this.#update();
      }

      /**
       * Update the visibility state of the action.
       */
      #update() {
        this.$el.parent().toggle(!this.#pendingReview.isNew());
      }

      /**
       * Handle the action activation.
       */
      activate() {
        ReviewDialogView.create({
          review: this.#pendingReview,
          reviewRequestEditor: this.#reviewRequestEditor
        });
      }
    }) || _class6$2;

    /**
     * Action view to add a general comment.
     *
     * Version Added:
     *     6.0
     */
    let AddGeneralCommentActionView = spina.spina(_class7$1 = class AddGeneralCommentActionView extends RB.Actions.MenuItemActionView {
      /**
       * Handle the action activation.
       */
      activate() {
        RB.PageManager.getPage().addGeneralComment();
      }
    }) || _class7$1;

    /**
     * Action view to mark a review request as "Ship It".
     *
     * Version Added:
     *     6.0
     */
    let ShipItActionView = spina.spina(_class8 = class ShipItActionView extends RB.Actions.MenuItemActionView {
      /**
       * Handle the action activation.
       */
      activate() {
        RB.PageManager.getPage().shipIt();
      }
    }) || _class8;

    /**
     * Action view for the review menu.
     *
     * Version Added:
     *     6.0
     */
    let ReviewMenuActionView = spina.spina(_class9 = class ReviewMenuActionView extends RB.Actions.MenuActionView {
      /**********************
       * Instance variables *
       **********************/

      /** The event overlay when the menu is shown in mobile mode. */
      #overlay = null;

      /**
       * Render the view.
       */
      onInitialRender() {
        super.onInitialRender();
        this.listenTo(this.menu, 'closing', this._removeOverlay);
      }

      /**
       * Handle a touchstart event.
       *
       * Args:
       *     e (TouchEvent):
       *         The touch event.
       */
      onTouchStart(e) {
        super.onTouchStart(e);
        if (this.menu.isOpen) {
          if (!this.#overlay) {
            this.#overlay = new RB.OverlayView();
            this.#overlay.$el.appendTo('body');
            this.listenTo(this.#overlay, 'click', () => {
              this.closeMenu();
            });
          }
        }
      }

      /**
       * Position the menu.
       *
       * Version Added:
       *     7.0.3
       */
      positionMenu() {
        const $menuEl = this.menu.$el;
        if (RB.PageManager.getPage().inMobileMode) {
          /*
           * Make the review menu take up the full width of the screen
           * when on mobile.
           *
           * This needs to happen before the call to the parent class so
           * that the parent uses the updated width for the menu.
           */
          $menuEl.css({
            'text-wrap': 'wrap',
            width: $(window).width()
          });
        } else {
          /* Use default styling on desktop. */
          $menuEl.css({
            'text-wrap': '',
            width: ''
          });
        }
        super.positionMenu();
      }

      /**
       * Remove the event overlay that's shown in mobile mode.
       *
       * Version Added:
       *     7.0.3
       */
      _removeOverlay() {
        if (this.#overlay) {
          this.#overlay.remove();
          this.#overlay = null;
        }
      }
    }) || _class9;

    /**
     * Action view for the "Add File" command.
     *
     * Version Added:
     *     6.0
     */
    let AddFileActionView = spina.spina(_class10 = class AddFileActionView extends RB.Actions.MenuItemActionView {
      /**
       * Handle the action activation.
       */
      activate() {
        const page = RB.PageManager.getPage();
        const reviewRequestEditorView = page.reviewRequestEditorView;
        const reviewRequestEditor = reviewRequestEditorView.model;
        if (reviewRequestEditor.hasUnviewedUserDraft) {
          reviewRequestEditorView.promptToLoadUserDraft();
        } else {
          const uploadDialog = new RB.UploadAttachmentView({
            reviewRequestEditor: reviewRequestEditor
          });
          uploadDialog.show();
        }
      }
    }) || _class10;

    /**
     * Action view for the "Update Diff" command.
     *
     * Version Added:
     *     6.0
     */
    let UpdateDiffActionView = spina.spina(_class11 = class UpdateDiffActionView extends RB.Actions.MenuItemActionView {
      /**
       * Handle the action activation.
       */
      activate() {
        const page = RB.PageManager.getPage();
        const reviewRequestEditorView = page.reviewRequestEditorView;
        const reviewRequestEditor = reviewRequestEditorView.model;
        const reviewRequest = reviewRequestEditor.get('reviewRequest');
        if (reviewRequestEditor.hasUnviewedUserDraft) {
          reviewRequestEditorView.promptToLoadUserDraft();
        } else if (reviewRequestEditor.get('commits').length > 0) {
          const rbtoolsURL = 'https://www.reviewboard.org/docs/rbtools/latest/';
          const $dialog = $('<div>').append($('<p>').html(interpolate(gettext("This review request was created with <a href=\"%(rbtoolsURL)s\">RBTools</a>, and is tracking commit history."), {
            "rbtoolsURL": rbtoolsURL
          }, true))).append($('<p>').html(gettext("To add a new diff revision, you will need to use <code>rbt post -u</code> instead of uploading a diff file."))).modalBox({
            buttons: [ink.paintComponent("Ink.Button", null, gettext("Cancel"))],
            title: gettext("Use RBTools to update the diff")
          }).on('close', () => {
            $dialog.modalBox('destroy');
          });
        } else {
          const updateDiffView = new RB.UpdateDiffView({
            model: new RB.UploadDiffModel({
              changeNumber: reviewRequest.get('commitID'),
              repository: reviewRequest.get('repository'),
              reviewRequest: reviewRequest
            })
          });
          updateDiffView.render();
        }
      }
    }) || _class11;

    /**
     * Action view for the "Close > Discarded" command.
     *
     * Version Added:
     *     6.0
     */
    let CloseDiscardedActionView = spina.spina(_class12 = class CloseDiscardedActionView extends RB.Actions.MenuItemActionView {
      /**
       * Handle the action activation.
       */
      activate() {
        const page = RB.PageManager.getPage();
        const reviewRequestEditorView = page.reviewRequestEditorView;
        const reviewRequestEditor = reviewRequestEditorView.model;
        const reviewRequest = reviewRequestEditor.get('reviewRequest');
        const confirmText = gettext("Are you sure you want to discard this review request?");
        if (confirm(confirmText)) {
          reviewRequest.close({
            type: RB.ReviewRequest.CLOSE_DISCARDED
          }).catch(err => this.model.trigger('closeError', err.message));
        }
      }
    }) || _class12;

    /**
     * Action view for the "Close > Completed" command.
     *
     * Version Added:
     *     6.0
     */
    let CloseCompletedActionView = spina.spina(_class13 = class CloseCompletedActionView extends RB.Actions.MenuItemActionView {
      /**
       * Handle the action activation.
       */
      activate() {
        const page = RB.PageManager.getPage();
        const reviewRequestEditorView = page.reviewRequestEditorView;
        const reviewRequestEditor = reviewRequestEditorView.model;
        const reviewRequest = reviewRequestEditor.get('reviewRequest');

        /*
         * This is a non-destructive event, so don't confirm unless there's
         * a draft.
         */
        let submit = true;
        if (reviewRequestEditor.get('hasDraft')) {
          submit = confirm(gettext("You have an unpublished draft. If you close this review request, the draft will be discarded. Are you sure you want to close the review request?"));
        }
        if (submit) {
          reviewRequest.close({
            type: RB.ReviewRequest.CLOSE_SUBMITTED
          }).catch(err => this.model.trigger('closeError', err.message));
        }
      }
    }) || _class13;

    /**
     * Action view for the "Close > Delete Permanently" command.
     *
     * Version Added:
     *     6.0
     */
    let DeleteActionView = spina.spina(_class14 = class DeleteActionView extends RB.Actions.MenuItemActionView {
      /**
       * Handle the action activation.
       */
      activate() {
        const page = RB.PageManager.getPage();
        const reviewRequestEditorView = page.reviewRequestEditorView;
        const reviewRequestEditor = reviewRequestEditorView.model;
        const reviewRequest = reviewRequestEditor.get('reviewRequest');
        const onDeleteConfirmed = () => {
          deleteButtonView.busy = true;
          reviewRequest.destroy({
            buttons: buttonEls
          }).then(() => RB.navigateTo(SITE_ROOT));
        };
        const deleteButtonView = ink.craftComponent("Ink.Button", {
          type: "danger",
          onClick: onDeleteConfirmed
        }, gettext("Delete"));
        const buttonEls = [ink.paintComponent("Ink.Button", null, gettext("Cancel")), deleteButtonView.el];
        const $dlg = $('<p>').text(gettext("This deletion cannot be undone. All diffs and reviews will be deleted as well.")).modalBox({
          buttons: buttonEls,
          title: gettext("Are you sure you want to delete this review request?")
        }).on('close', () => $dlg.modalBox('destroy'));
      }
    }) || _class14;

    var _class$l;

    /**
     * Abstract view for comment blocks.
     */
    let AbstractCommentBlockView = spina.spina(_class$l = class AbstractCommentBlockView extends spina.BaseView {
      static events = {
        'click': '_onClicked'
      };
      static modelEvents = {
        'change:draftComment': '_onDraftCommentChanged'
      };
      static tooltipSides = 'lrbt';

      /**********************
       * Instance variables *
       **********************/

      /** The tooltip when hovering over the comment flag. */
      #$tooltip;

      /**
       * Dispose the comment block.
       *
       * This will remove the view and the tooltip.
       */
      dispose() {
        this.trigger('removing');
        this.remove();
        this.#$tooltip.remove();
      }

      /**
       * Render the comment block.
       *
       * Along with the block, a floating tooltip will be created that
       * displays summaries of the comments.
       */
      onInitialRender() {
        this.#$tooltip = $.tooltip(this.$el, {
          side: AbstractCommentBlockView.tooltipSides
        }).attr('data-ink-color-scheme', 'light').addClass('comments');
        this.renderContent();
        this._onDraftCommentChanged();
        this.#updateTooltip();
      }

      /**
       * Render the comment content.
       *
       * This should be implemented by subclasses.
       */
      renderContent() {
        // Intentionally left blank.
      }

      /**
       * Hide the tooltip from the page.
       *
       * This will force the tooltip to hide, preventing it from interfering
       * with operations such as moving a comment block.
       *
       * It will automatically show again the next time there is a mouse enter
       * event.
       */
      hideTooltip() {
        this.#$tooltip.hide();
      }

      /**
       * Position the comment dlg to the right side of comment block.
       *
       * This can be overridden to change where the comment dialog will
       * be displayed.
       *
       * Args:
       *     commentDlg (RB.CommentDialogView):
       *          The view for the comment dialog.
       */
      positionCommentDlg(commentDlg) {
        commentDlg.positionBeside(this.$el, {
          fitOnScreen: true,
          side: 'r'
        });
      }

      /**
       * Position the notification bubble around the comment block.
       *
       * This can be overridden to change where the bubble will be displayed.
       * By default, it is centered over the block.
       *
       * Args:
       *     $bubble (jQuery):
       *         The selector for the notification bubble.
       */
      positionNotifyBubble($bubble) {
        $bubble.move(Math.round((this.$el.width() - $bubble.width()) / 2), Math.round((this.$el.height() - $bubble.height()) / 2));
      }

      /**
       * Notify the user of some update.
       *
       * This notification appears in the comment area.
       *
       * Args:
       *     text (string):
       *         The text to show in the notification.
       *
       *     cb (function, optional):
       *         A callback function to call once the notification has been
       *         removed.
       *
       *     context (object):
       *         Context to bind when calling the ``cb`` callback function.
       */
      notify(text, cb, context) {
        const $bubble = $('<div class="bubble">').css('opacity', 0).appendTo(this.$el).text(text);
        this.positionNotifyBubble($bubble);
        $bubble.animate({
          opacity: 0.8,
          top: '-=10px'
        }, 350, 'swing').delay(1200).animate({
          opacity: 0,
          top: '+=10px'
        }, 350, 'swing', () => {
          $bubble.remove();
          if (_.isFunction(cb)) {
            cb.call(context);
          }
        });
      }

      /**
       * Update the tooltip contents.
       *
       * The contents will show the summary of each comment, including
       * the draft comment, if any.
       */
      #updateTooltip() {
        const $list = $('<ul>');
        const draftComment = this.model.get('draftComment');
        const tooltipTemplate = _.template(`<li>
 <div class="reviewer">
  <%- user %>:
 </div>
 <pre class="rich-text"><%= html %></pre>
</li>`);
        if (draftComment) {
          $(tooltipTemplate({
            html: draftComment.get('html'),
            user: RB.UserSession.instance.get('fullName')
          })).addClass('draft').appendTo($list);
        }
        this.model.get('serializedComments').forEach(comment => {
          $(tooltipTemplate({
            html: comment.html,
            user: comment.user.name
          })).appendTo($list);
        });
        this.#$tooltip.empty().append($list);
      }

      /**
       * Handle changes to the model's draftComment property.
       *
       * If there's a new draft comment, we'll begin listening for updates
       * on it in order to update the tooltip or display notification bubbles.
       *
       * The comment block's style will reflect whether or not we have a
       * draft comment.
       *
       * If the draft comment is deleted, and there are no other comments,
       * the view will be removed.
       */
      _onDraftCommentChanged() {
        const comment = this.model.get('draftComment');
        if (!comment) {
          this.$el.removeClass('draft');
          return;
        }
        comment.on('change:text', this.#updateTooltip, this);
        comment.on('destroy', () => {
          this.notify(gettext("Comment Deleted"), () => {
            // Discard the comment block if empty.
            if (this.model.isEmpty()) {
              this.$el.fadeOut(350, () => this.dispose());
            } else {
              this.$el.removeClass('draft');
              this.#updateTooltip();
            }
          });
        });
        comment.on('saved', options => {
          this.#updateTooltip();
          if (!options.boundsUpdated) {
            this.notify(gettext("Comment Saved"));
          }
          if (!RB.EnabledFeatures.unifiedBanner) {
            RB.DraftReviewBannerView.instance.show();
          }
        });
        this.$el.addClass('draft');
      }

      /**
       * Handle the comment block being clicked.
       *
       * Emits the 'clicked' signal so that parent views can process it.
       */
      _onClicked() {
        this.trigger('clicked');
      }
    }) || _class$l;

    var _class$k, _class2$4;

    /**
     * Options for the CommentsListView.
     *
     * Version Added:
     *     6.0
     */
    /**
     * Displays a list of existing comments within a comment dialog.
     *
     * Each comment in the list is an existing, published comment that a user
     * has made. They will be displayed, along with any issue states and
     * identifying information, and links for viewing the comment on the review
     * or replying to it.
     *
     * This is used internally in CommentDialogView.
     */
    let CommentsListView = spina.spina(_class$k = class CommentsListView extends spina.BaseView {
      static itemTemplate = _.template(`<li class="<%= itemClass %>">
 <h2>
  <%- comment.user.name %>
  <span class="actions">
   <a class="comment-list-view-action" href="<%= comment.url %>"><%- viewText %></a>
   <a class="comment-list-reply-action"
      href="<%= reviewRequestURL %>?reply_id=<%= comment.reply_to_id || comment.comment_id %>&reply_type=<%= replyType %>"
      ><%- replyText %></a>
  </span>
 </h2>
 <pre><%- comment.text %></pre>
</li>`);
      static replyText = gettext("Reply");
      static viewText = gettext("View");

      /**********************
       * Instance variables *
       **********************/

      /** Options for the view. */

      /**
       * Initialize the view.
       *
       * Args:
       *     options (CommentsListViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.options = options;
      }

      /**
       * Set the list of displayed comments.
       *
       * Args:
       *     comments (Array of object):
       *         The serialized comments.
       *
       *     replyType (string):
       *         The type of comment, for use in creating replies.
       */
      setComments(comments, replyType) {
        if (comments.length === 0) {
          return;
        }
        const reviewRequestURL = this.options.reviewRequestURL;
        const commentIssueManager = this.options.commentIssueManager;
        const interactive = this.options.issuesInteractive;
        let odd = true;
        let $items = $();
        comments.forEach(serializedComment => {
          const commentID = serializedComment.comment_id;
          const $item = $(CommentsListView.itemTemplate({
            comment: serializedComment,
            itemClass: odd ? 'odd' : 'even',
            replyText: CommentsListView.replyText,
            replyType: replyType,
            reviewRequestURL: reviewRequestURL,
            viewText: CommentsListView.viewText
          }));
          if (serializedComment.issue_opened) {
            const commentIssueBar = new RB.CommentIssueBarView({
              commentID: commentID,
              commentIssueManager: commentIssueManager,
              commentType: replyType,
              interactive: interactive,
              isCompact: true,
              issueStatus: serializedComment.issue_status,
              reviewID: serializedComment.review_id
            });
            commentIssueBar.render().$el.appendTo($item);

            /*
             * Update the serialized comment's issue status whenever
             * the real comment's status is changed so we will
             * display it correctly the next time we render it.
             */
            this.listenTo(commentIssueManager, 'issueStatusUpdated', comment => {
              if (comment.id === commentID) {
                serializedComment.issue_status = comment.get('issueStatus');
              }
            });
          }
          $items = $items.add($item);
          odd = !odd;
        });
        this.$el.empty().append($items);
      }
    }) || _class$k;
    /**
     * Options for the CommentDialogView.
     */
    /**
     * Options for creating the CommentDialogView.
     */
    /**
     * A dialog that allows for creating, editing or deleting draft comments on
     * a diff or file attachment. The dialog can be moved around on the page.
     *
     * Any existing comments for the selected region will be displayed alongside
     * the dialog for reference. However, this dialog is not intended to be
     * used to reply to those comments.
     */
    let CommentDialogView = spina.spina(_class2$4 = class CommentDialogView extends spina.BaseView {
      static className = 'comment-dlg';
      static events = {
        'click .btn-cancel': '_onCancelClicked',
        'click .btn-close': '_onCancelClicked',
        'click .btn-delete': '_onDeleteClicked',
        'click .btn-save': 'save',
        'keydown .comment-text-field': '_onTextKeyDown',
        'scroll': '_onScroll',
        'wheel': '_onScroll'
      };

      /** The singleton instance. */
      static _instance = null;
      static DIALOG_TOTAL_HEIGHT = 350;
      static DIALOG_TOTAL_HEIGHT_PORTRAIT = 400;
      static DIALOG_NON_EDITABLE_HEIGHT = 120;
      static DIALOG_READ_ONLY_HEIGHT = 104;
      static SLIDE_DISTANCE = 10;
      static COMMENTS_BOX_WIDTH = 280;
      static COMMENTS_BOX_HEIGHT_PORTRAIT = 175;
      static FORM_BOX_WIDTH = 450;
      static _cancelText = gettext("Cancel");
      static _closeText = gettext("Close");
      static _deleteText = gettext("Delete");
      static _enableMarkdownText = gettext("Enable <u>M</u>arkdown");
      static _loginTextTemplate = gettext("You must <a href=\"%s\">log in</a> to post a comment.");
      static _markdownText = gettext("Markdown");
      static _openAnIssueText = gettext("Open an <u>I</u>ssue");
      static _otherReviewsText = gettext("Other reviews");
      static _saveText = gettext("Save");
      static _shouldExitText = gettext("You have unsaved changes. Are you sure you want to exit?");
      static _verifyIssueText = gettext("Require Verification");
      static _yourCommentText = gettext("Your comment");
      static _yourCommentDirtyText = gettext("Your comment (unsaved)");
      static template = _.template(`<div class="other-comments">
 <h1 class="title other-comments-header">
  <%- otherReviewsText %>
 </h1>
 <ul></ul>
</div>
<form method="post">
 <h1 class="comment-dlg-header">
  <span class="title"></span>
  <% if (canEdit) { %>
   <a class="markdown-info" href="<%- markdownDocsURL %>"
      target="_blank"><%- markdownText %></a>
  <% } %>
 </h1>
 <% if (!authenticated) { %>
  <p class="login-text"><%= loginText %></p>
 <% } else if (deletedWarning) { %>
  <p class="deleted-warning"><%= deletedWarning %></p>
 <% } else if (readOnly) { %>
  <p class="read-only-text"><%= readOnlyText %></p>
 <% } else if (draftWarning) { %>
  <p class="draft-warning"><%= draftWarning %></p>
 <% } %>
 <div class="comment-dlg-body">
  <div class="comment-text-field"></div>
  <ul class="comment-dlg-options">
   <li class="comment-issue-options">
    <input type="checkbox" id="comment_issue">
    <label for="comment_issue"
           accesskey="i"><%= openAnIssueText %></label>
    <% if (showVerify) { %>
     <input type="checkbox" id="comment_issue_verify">
     <label for="comment_issue_verify"><%= verifyIssueText %></label>
    <% } %>
   </li>
   <li class="comment-markdown-options">
    <input type="checkbox" id="enable_markdown">
    <label for="enable_markdown"
           accesskey="m"><%= enableMarkdownText %></label>
   </li>
  </ul>
 </div>
 <div class="comment-dlg-footer">
  <div class="buttons">
   <button class="ink-c-button btn-save" type="button" disabled>
    <%- saveButton %>
   </button>
   <button class="ink-c-button btn-cancel" type="button">
    <%- cancelButton %>
   </button>
   <button class="ink-c-button btn-delete" type="button" disabled>
    <%- deleteButton %>
   </button>
   <button class="ink-c-button btn-close" type="button">
    <%- closeButton %>
   </button>
  </div>
 </div>
</form>`);

      /**
       * Create and shows a new comment dialog and associated model.
       *
       * This is a class method that handles providing a comment dialog
       * ready to use with the given state.
       *
       * Only one comment dialog can appear on the screen at any given time
       * when using this.
       *
       * Args:
       *     options (CommentDialogViewCreationOptions):
       *         Options for the view construction.
       */
      static create(options) {
        console.assert(options.comment, 'A comment must be specified');
        const reviewRequestEditor = options.reviewRequestEditor || RB.PageManager.getPage().model.reviewRequestEditor;
        options.animate = options.animate !== false;
        const dlg = new this({
          animate: options.animate,
          commentIssueManager: options.commentIssueManager || reviewRequestEditor.get('commentIssueManager'),
          deletedWarning: options.deletedWarning,
          draftWarning: options.draftWarning,
          model: new CommentEditor({
            comment: options.comment,
            publishedComments: options.publishedComments || undefined,
            publishedCommentsType: options.publishedCommentsType || undefined,
            reviewRequest: reviewRequestEditor.get('reviewRequest'),
            reviewRequestEditor: reviewRequestEditor
          })
        });
        dlg.render().$el.appendTo(options.container || document.body);
        options.position = options.position || {};
        if (_.isFunction(options.position)) {
          options.position(dlg);
        } else if (options.position.beside) {
          dlg.positionBeside(options.position.beside.el, options.position.beside);
        } else {
          let x = options.position.x;
          let y = options.position.y;
          if (x === undefined) {
            /* Center it. */
            x = $(document).scrollLeft() + ($(window).width() - dlg.$el.width()) / 2;
          }
          if (y === undefined) {
            /* Center it. */
            y = $(document).scrollTop() + ($(window).height() - dlg.$el.height()) / 2;
          }
          dlg.move(x, y);
        }
        dlg.on('closed', () => CommentDialogView._instance = null);
        const instance = CommentDialogView._instance;
        const showCommentDlg = function showCommentDlg() {
          try {
            dlg.open();
          } catch (e) {
            dlg.close();
            throw e;
          }
          CommentDialogView._instance = dlg;
        };
        if (instance) {
          instance.on('closed', showCommentDlg);
          instance.close();
        } else {
          showCommentDlg();
        }
        return dlg;
      }

      /**********************
       * Instance variables *
       **********************/

      /** The buttons on the dialog. */

      /** The cancel button. */

      /** The close button. */

      /** The delete button. */

      /** The save button. */

      /** The list of views for all the comments. */

      /** The options for the view. */

      #$draftWarning;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (CommentDialogViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.options = options;
      }

      /**
       * Render the view.
       */
      onInitialRender() {
        const model = this.model;
        const userSession = RB.UserSession.instance;
        const reviewRequest = model.get('reviewRequest');
        const reviewRequestEditor = model.get('reviewRequestEditor');
        const deletedWarning = this.options.deletedWarning;
        if (deletedWarning) {
          /* Block commenting on deleted objects. */
          model.set('canEdit', false);
        }
        this.$el.hide().html(CommentDialogView.template({
          authenticated: userSession.get('authenticated'),
          canEdit: model.get('canEdit'),
          cancelButton: CommentDialogView._cancelText,
          closeButton: CommentDialogView._closeText,
          deleteButton: CommentDialogView._deleteText,
          deletedWarning: deletedWarning,
          draftWarning: this.options.draftWarning,
          enableMarkdownText: CommentDialogView._enableMarkdownText,
          loginText: interpolate(CommentDialogView._loginTextTemplate, [userSession.get('loginURL')]),
          markdownDocsURL: MANUAL_URL + 'users/markdown/',
          markdownText: CommentDialogView._markdownText,
          openAnIssueText: CommentDialogView._openAnIssueText,
          otherReviewsText: CommentDialogView._otherReviewsText,
          readOnly: userSession.get('readOnly'),
          readOnlyText: gettext("Review Board is currently in read-only mode."),
          saveButton: CommentDialogView._saveText,
          showVerify: RB.EnabledFeatures.issueVerification,
          verifyIssueText: CommentDialogView._verifyIssueText
        }));
        this._$commentsPane = this.$('.other-comments');
        this._$draftForm = this.$('form');
        this._$body = this._$draftForm.children('.comment-dlg-body');
        this._$header = this._$draftForm.children('.comment-dlg-header');
        this._$footer = this._$draftForm.children('.comment-dlg-footer');
        this._$title = this._$header.children('.title');
        this._$commentOptions = this._$body.children('.comment-dlg-options');
        this._$issueOptions = this._$commentOptions.children('.comment-issue-options').bindVisibility(model, 'canEdit');
        this._$markdownOptions = this._$commentOptions.children('.comment-markdown-options').bindVisibility(model, 'canEdit');
        this._$issueField = this._$issueOptions.find('#comment_issue').bindProperty('checked', model, 'openIssue').bindProperty('disabled', model, 'editing', {
          elementToModel: false,
          inverse: true
        });
        this._$issueVerificationField = this._$issueOptions.find('#comment_issue_verify').bindProperty('checked', model, 'requireVerification').bindProperty('disabled', model, 'editing', {
          elementToModel: false,
          inverse: true
        });
        this._$enableMarkdownField = this._$markdownOptions.find('#enable_markdown').bindProperty('checked', model, 'richText').bindProperty('disabled', model, 'editing', {
          elementToModel: false,
          inverse: true
        });
        this.#$draftWarning = this.$('.draft-warning');
        const $buttons = this._$footer.find('.buttons');
        this.$buttons = $buttons;
        this.$saveButton = $buttons.children('.btn-save').bindVisibility(model, 'canEdit').bindProperty('disabled', model, 'canSave', {
          elementToModel: false,
          inverse: true
        });
        this.$cancelButton = $buttons.children('.btn-cancel').bindVisibility(model, 'canEdit');
        this.$deleteButton = $buttons.children('.btn-delete').bindVisibility(model, 'canDelete').bindProperty('disabled', model, 'canDelete', {
          elementToModel: false,
          inverse: true
        });
        this.$closeButton = $buttons.children('.btn-close').bindVisibility(model, 'canEdit', {
          inverse: true
        });
        this.commentsList = new CommentsListView({
          commentIssueManager: this.options.commentIssueManager,
          el: this._$commentsPane.find('ul'),
          issuesInteractive: reviewRequestEditor.get('editable'),
          reviewRequestURL: reviewRequest.get('reviewURL')
        });

        /*
         * We need to handle keypress here, rather than in events above,
         * because jQuery will actually handle it. Backbone fails to.
         */
        this._textEditor = new RB.TextEditorView({
          autoSize: false,
          bindRichText: {
            attrName: 'richText',
            model: model
          },
          el: this._$draftForm.find('.comment-text-field'),
          minHeight: 0,
          text: model.get('text')
        });
        this._textEditor.render();
        this._textEditor.show();
        this._textEditor.$el.bindVisibility(model, 'canEdit');
        this.listenTo(this._textEditor, 'change', () => model.set('text', this._textEditor.getText()));
        this._textEditor.bindRichTextCheckbox(this._$enableMarkdownField);
        this._textEditor.bindRichTextVisibility(this._$draftForm.find('.markdown-info'));
        this.listenTo(model, 'change:text', () => this._textEditor.setText(model.get('text')));
        this.listenTo(model, 'change:richText', this.#handleResize);
        this.$el.css('position', 'absolute').mousedown(evt => {
          /*
           * Prevent this from reaching the selection area, which will
           * swallow the default action for the mouse down.
           */
          evt.stopPropagation();
        }).resizable({
          handles: $.support.touch ? 'grip,se' : 'grip,n,e,s,w,se,sw,ne,nw',
          resize: _.bind(this.#handleResize, this),
          transparent: true
        }).proxyTouchEvents();
        this.$el.draggable({
          handle: '.comment-dlg-header, .other-comments-header'
        });
        this.listenTo(model, 'change:dirty', this.#updateTitle);
        this.#updateTitle();
        this.listenTo(model, 'change:publishedComments', () => this.#onPublishedCommentsChanged());
        this.#onPublishedCommentsChanged();

        /* Add any hooks. */
        RB.CommentDialogHook.each(hook => {
          const HookViewType = hook.get('viewType');
          const hookView = new HookViewType({
            commentDialog: this,
            commentEditor: model,
            el: this.el,
            extension: hook.get('extension')
          });
          hookView.render();
        });
      }

      /**
       * Callback for when the Save button is pressed.
       *
       * Saves the comment, creating it if it's new, and closes the dialog.
       */
      save() {
        /*
         * Set this immediately, in case new text has been set in the editor
         * that we haven't been notified about yet.
         */
        this.model.set('text', this._textEditor.getText());
        if (this.model.get('canSave')) {
          this.model.save().catch(err => {
            alert(gettext("Error saving comment:") + err.message);
          });
          this.close();
        }
      }

      /**
       * Open the comment dialog and focuses the text field.
       */
      open() {
        function openDialog() {
          this.$el.scrollIntoView();
          this._textEditor.focus();
        }
        if (this.options.animate) {
          this.$el.css({
            opacity: 0,
            top: parseInt(this.$el.css('top'), 10) - CommentDialogView.SLIDE_DISTANCE
          });
        }
        this.$el.show();
        this.#handleResize();
        if (this.model.get('canEdit')) {
          this.model.beginEdit();
        }
        if (this.options.animate) {
          this.$el.animate({
            opacity: 1,
            top: `+=${CommentDialogView.SLIDE_DISTANCE}px`
          }, 350, 'swing', _.bind(openDialog, this));
        } else {
          openDialog.call(this);
        }
      }

      /**
       * Close the comment dialog, discarding the comment block if empty.
       *
       * This can optionally take a callback and context to notify when the
       * dialog has been closed.
       *
       * Args:
       *     onClosed (function, optional):
       *         An optional callback to call once the dialog has been closed.
       *
       *     context (object, optional):
       *         Context to use when calling ``onClosed``.
       */
      close(onClosed = undefined, context = {}) {
        function closeDialog() {
          this.model.close();
          this.$el.remove();
          this.trigger('closed');
          if (_.isFunction(onClosed)) {
            onClosed.call(context);
          }
        }
        if (this.options.animate && this.$el.is(':visible')) {
          this.$el.animate({
            opacity: 0,
            top: `-=${CommentDialogView.SLIDE_DISTANCE}px`
          }, 350, 'swing', _.bind(closeDialog, this));
        } else {
          closeDialog.call(this);
        }
      }

      /**
       * Move the comment dialog to the given coordinates.
       *
       * Args:
       *     x (number):
       *         The X-coordinate to move the dialog to.
       *
       *     y (number):
       *         The Y-coordinate to move the dialog to.
       */
      move(x, y) {
        this.$el.move(x, y);
      }

      /**
       * Position the dialog beside an element.
       *
       * This takes the same arguments that $.fn.positionToSide takes.
       *
       * Args:
       *     $el (jQuery):
       *        The element to move the dialog next to.
       *
       *     options (object):
       *         Options for the ``positionToSide`` call.
       */
      positionBeside($el, options) {
        this.$el.positionToSide($el, options);
      }

      /**
       * Update the title of the comment dialog, based on the current state.
       */
      #updateTitle() {
        this._$title.text(this.model.get('dirty') ? CommentDialogView._yourCommentDirtyText : CommentDialogView._yourCommentText);
      }

      /**
       * Callback for when the list of published comments changes.
       *
       * Sets the list of comments in the CommentsList, and factors in some
       * new layout properties.
       */
      #onPublishedCommentsChanged() {
        const comments = this.model.get('publishedComments') || [];
        this.commentsList.setComments(comments, this.model.get('publishedCommentsType'));
        const showComments = comments.length > 0;
        const canFitPortraitMode = this.#canFitPortraitMode();
        this._$commentsPane.toggle(showComments);

        /* Do this here so that calculations can be done before open() */
        let width = CommentDialogView.FORM_BOX_WIDTH;
        let height = CommentDialogView.DIALOG_NON_EDITABLE_HEIGHT;
        if (showComments && !canFitPortraitMode) {
          width += CommentDialogView.COMMENTS_BOX_WIDTH;
        }
        if (showComments && canFitPortraitMode) {
          height = CommentDialogView.DIALOG_TOTAL_HEIGHT_PORTRAIT;
        } else if (this.model.get('canEdit')) {
          height = CommentDialogView.DIALOG_TOTAL_HEIGHT;
        } else if (RB.UserSession.instance.get('readOnly')) {
          height = CommentDialogView.DIALOG_READ_ONLY_HEIGHT;
        }
        this.$el.width(width).height(height);
      }

      /**
       * Handle the resize of the comment dialog.
       *
       * This will lay out the elements in the dialog appropriately.
       */
      #handleResize() {
        const showComments = this._$commentsPane.is(':visible');
        let height = this.$el.height();
        let width = this.$el.width();
        let draftFormX = 0;
        let draftFormY = 0;
        if (showComments) {
          let commentsHeight = height;
          let commentsWidth = width;
          if (this.#canFitPortraitMode()) {
            /*
             * Portrait mode, stack the comments box and draft form
             * vertically.
             */
            commentsHeight = CommentDialogView.COMMENTS_BOX_HEIGHT_PORTRAIT;
            draftFormY = commentsHeight;
            height -= commentsHeight;
          } else {
            /*
             * Landscape mode, stack the comments box and draft form
             * horizontally.
             */
            commentsWidth = CommentDialogView.COMMENTS_BOX_WIDTH;
            draftFormX = commentsWidth;
            width -= commentsWidth;
          }
          this._$commentsPane.outerWidth(commentsWidth).outerHeight(commentsHeight).move(0, 0, 'absolute');
          const $commentsList = this.commentsList.$el;
          $commentsList.height(this._$commentsPane.height() - $commentsList.position().top);
        }
        this._$draftForm.outerWidth(width).outerHeight(height).move(draftFormX, draftFormY, 'absolute');
        const warningHeight = this.#$draftWarning.outerHeight(true) || 0;
        const $textField = this._textEditor.$el;
        this._textEditor.setSize(this._$body.width() - $textField.getExtents('b', 'lr'), this._$draftForm.height() - this._$header.outerHeight() - this._$commentOptions.outerHeight() - this._$footer.outerHeight() - warningHeight - $textField.getExtents('b', 'tb'));
      }

      /**
       * Return whether the portrait version of the dialog can fit on screen.
       *
       * This checks whether the height of the dialog fits within the screen
       * height.
       *
       * Version Added:
       *     7.0.3
       *
       * Returns:
       *     boolean:
       *     Whether the portrait version of the dialog can fit on screen.
       */
      #canFitPortraitMode() {
        return RB.PageManager.getPage().inMobileMode && $(window).height() > CommentDialogView.DIALOG_TOTAL_HEIGHT_PORTRAIT;
      }

      /**
       * Callback for when the Cancel button is pressed.
       *
       * Cancels the comment (which may delete the comment block, if it's new)
       * and closes the dialog.
       */
      _onCancelClicked() {
        let shouldExit = true;
        if (this.model.get('dirty')) {
          shouldExit = confirm(CommentDialogView._shouldExitText);
        }
        if (shouldExit) {
          this.model.cancel();
          this.close();
        }
      }

      /**
       * Callback for when the Delete button is pressed.
       *
       * Deletes the comment and closes the dialog.
       */
      _onDeleteClicked() {
        if (this.model.get('canDelete')) {
          this.model.deleteComment();
          this.close();
        }
      }

      /**
       * Callback for keydown events in the text field.
       *
       * If the Escape key is pressed, the dialog will be closed.
       * If the Control-Enter or Alt-I keys are pressed, we'll handle them
       * specially. Control-Enter is the same thing as clicking Save.
       *
       * metaKey used as alternative for Mac key shortcut philosophy.
       * metaKey is only fired on keydown in Chrome and Brave.
       *
       * The keydown event won't be propagated to the parent elements.
       *
       * Args:
       *     e (KeyboardEvent):
       *         The keydown event.
       */
      _onTextKeyDown(e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          this._onCancelClicked();
        } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          e.stopPropagation();
          this.save();
        } else if (e.key === 'i' && (e.metaKey || e.altKey)) {
          e.preventDefault();
          e.stopPropagation();
          this.model.set('openIssue', !this.model.get('openIssue'));
        } else if (e.key === 'm' && (e.metaKey || e.altKey)) {
          e.preventDefault();
          e.stopPropagation();
          this.model.set('richText', !this.model.get('richText'));
        }
      }

      /**
       * Callback for scroll or wheel events.
       *
       * This will prevent the page from scrolling when the scroll wheel is
       * used over the comment dialog.
       *
       * Version Added:
       *     7.0
       *
       * Args:
       *     evt (Event):
       *         The scroll or wheel event.
       */
      _onScroll(evt) {
        const target = evt.target;
        let textEl = null;
        if (target.tagName === 'TEXTAREA' || target.classList.contains('CodeMirror-scroll')) {
          textEl = target;
        } else {
          textEl = target.closest('.CodeMirror-scroll');
        }
        if (textEl === null) {
          /*
           * If the event is happening in the comment dialog but not in the
           * text editor or Other Comments area, we can just swallow it
           * right away.
           */
          if (target.closest('.other-comments > ul') === null) {
            evt.preventDefault();
          }
        } else {
          /*
           * If the event is in the text editor, we need to figure out if the
           * editor is scrollable. If it is, we let the default handler run.
           * If not, swallow it so it doesn't bubble up to the main
           * document.
           */
          if (textEl.scrollHeight === textEl.clientHeight) {
            evt.preventDefault();
          }
        }
      }
    }) || _class2$4;

    var _dec$5, _class$j;

    /**
     * Options for the AbstractReviewableView.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Abstract base for review UIs.
     *
     * This provides all the basics for creating a review UI. It does the
     * work of loading in comments, creating views, and displaying comment dialogs,
     */
    let AbstractReviewableView = (_dec$5 = spina.spina({
      prototypeAttrs: ['commentBlockView', 'commentsListName']
    }), _dec$5(_class$j = class AbstractReviewableView extends spina.BaseView {
      /**
       * The AbstractCommentBlockView subclass.
       *
       * This is the type that will be instantiated for rendering comment blocks.
       */
      static commentBlockView = null;

      /**
       * The list type (as a string) for passing to CommentDlg.
       */
      static commentsListName = null;

      /**********************
       * Instance variables *
       **********************/

      /** The comment dialog. */
      commentDlg = null;

      /** Whether the Review UI is rendered inline or as a full page. */

      /** The current comment block, if creating or editing a comment. */
      #activeCommentBlock = null;

      /**
       * Initialize AbstractReviewableView.
       *
       * Args:
       *     options (object, optional):
       *         Options for the view.
       */
      initialize(options = {}) {
        console.assert(!!this.commentBlockView, 'commentBlockView must be defined by the subclass');
        console.assert(!!this.commentsListName, 'commentsListName must be defined by the subclass');
        this.renderedInline = options.renderedInline || false;
      }

      /**
       * Render the reviewable to the page.
       *
       * This will call the subclass's renderContent(), and then handle
       * rendering each comment block on the reviewable.
       */
      onInitialRender() {
        this.renderContent();
        this.model.commentBlocks.each(this._addCommentBlockView, this);
        this.model.commentBlocks.on('add', this._addCommentBlockView, this);
      }

      /**
       * Render the content of the reviewable.
       *
       * This should be overridden by subclasses.
       */
      renderContent() {
        // Intentionally left blank.
      }

      /**
       * Create a new comment in a comment block and opens it for editing.
       *
       * Args:
       *     options (object):
       *         Options for the comment block creation.
       */
      createAndEditCommentBlock(options) {
        if (this.commentDlg !== null && this.commentDlg.model.get('dirty') && !confirm(gettext("You are currently editing another comment. Would you like to discard it and create a new one?"))) {
          return;
        }
        let defaultCommentBlockFields = _.result(this.model, 'defaultCommentBlockFields');
        if (defaultCommentBlockFields.length === 0 && this.model.reviewableIDField) {
          console.log(`Deprecation notice: Reviewable subclass is missing
defaultCommentBlockFields. Rename reviewableIDField to
defaultCommentBlockFields, and make it a list. This will
be removed in Review Board 8.0.`);
          defaultCommentBlockFields = [this.model.reviewableIDField];
        }

        /* As soon as we add the comment block, show the dialog. */
        this.once('commentBlockViewAdded', commentBlockView => this.showCommentDlg(commentBlockView));
        _.extend(options, _.pick(this.model.attributes, defaultCommentBlockFields));
        this.model.createCommentBlock(options);
      }

      /**
       * Show the comment details dialog for a comment block.
       *
       * Args:
       *     commentBlockView (RB.AbstractCommentBlockView):
       *         The comment block to show the dialog for.
       */
      showCommentDlg(commentBlockView) {
        const commentBlock = commentBlockView.model;
        commentBlock.ensureDraftComment();
        if (this.#activeCommentBlock === commentBlock) {
          return;
        }
        this.stopListening(this.commentDlg, 'closed');
        this.commentDlg = CommentDialogView.create({
          comment: commentBlock.get('draftComment'),
          deletedWarning: commentBlock.getDeletedWarning(),
          draftWarning: commentBlock.getDraftWarning(),
          position: dlg => commentBlockView.positionCommentDlg(dlg),
          publishedComments: commentBlock.get('serializedComments'),
          publishedCommentsType: this.commentsListName
        });
        this.#activeCommentBlock = commentBlock;
        this.listenTo(this.commentDlg, 'closed', () => {
          this.commentDlg = null;
          this.#activeCommentBlock = null;
        });
      }

      /**
       * Add a CommentBlockView for the given CommentBlock.
       *
       * This will create a view for the block, render it, listen for clicks
       * in order to show the comment dialog, and then emit
       * 'commentBlockViewAdded'.
       *
       * Args:
       *     commentBlock (RB.AbstractCommentBlock):
       *         The comment block to add a view for.
       */
      _addCommentBlockView(commentBlock) {
        const commentBlockView = new this.commentBlockView({
          model: commentBlock
        });
        commentBlockView.on('clicked', () => this.showCommentDlg(commentBlockView));
        commentBlockView.render();
        this.trigger('commentBlockViewAdded', commentBlockView);
      }
    }) || _class$j);

    var _class$i;


    /**
     * Options for CommentIssueBarView.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Manages a comment's issue status bar.
     *
     * The buttons on the bar will update the comment's issue status on the server
     * when clicked. The bar will update to reflect the issue status of any
     * comments tracked by the issue summary table.
     *
     * Version Changed:
     *     7.0:
     *     Rewritten for the new ``.rb-c-issue-bar`` component, for improved
     *     accessibility, and for use in Ink's craft/paint mechanism.
     */
    let CommentIssueBarView = spina.spina(_class$i = class CommentIssueBarView extends ink.BaseComponentView {
      static className = 'rb-c-issue-bar';
      static events = {
        'click .ink-c-button[data-action="drop"]': '_onDropClicked',
        'click .ink-c-button[data-action="reopen"]': '_onReopenClicked',
        'click .ink-c-button[data-action="resolve"]': '_onFixedClicked',
        'click .ink-c-button[data-action="verify-dropped"]': '_onVerifyDroppedClicked',
        'click .ink-c-button[data-action="verify-resolved"]': '_onVerifyResolvedClicked'
      };

      /** The actions available on the issue bar. */
      static Actions = {
        'drop': {
          label: gettext("Drop"),
          onClick: '_onDropClicked'
        },
        'reopen': {
          label: gettext("Re-open"),
          onClick: '_onReopenClicked'
        },
        'resolve': {
          label: gettext("Fixed"),
          onClick: '_onFixedClicked'
        },
        'verify-dropped': {
          label: gettext("Verify Dropped"),
          onClick: '_onVerifyDroppedClicked',
          requireCanVerify: true
        },
        'verify-resolved': {
          label: gettext("Verify Fixed"),
          onClick: '_onVerifyFixedClicked',
          requireCanVerify: true
        }
      };

      /**
       * Information on each valid status.
       */
      static StatusInfo = {
        [RB.CommentIssueStatusType.DROPPED]: {
          actions: ['reopen'],
          message: gettext("The issue has been dropped.")
        },
        [RB.CommentIssueStatusType.OPEN]: {
          actions: ['resolve', 'drop'],
          message: gettext("An issue was opened.")
        },
        [RB.CommentIssueStatusType.RESOLVED]: {
          actions: ['reopen'],
          message: gettext("The issue has been resolved.")
        },
        [RB.CommentIssueStatusType.VERIFYING_DROPPED]: {
          actions: ['reopen', 'verify-dropped'],
          message: gettext("Waiting for verification before dropping...")
        },
        [RB.CommentIssueStatusType.VERIFYING_RESOLVED]: {
          actions: ['reopen', 'verify-resolved'],
          message: gettext("Waiting for verification before resolving...")
        }
      };

      /**********************
       * Instance variables *
       **********************/

      /*
       * Comment/issue management state.
       */

      /** The ID of the comment object. */
      #commentID;

      /** The type of comment being modified. */
      #commentType;

      /** The issue manager for accessing and setting issue statuses. */
      #issueManager;

      /** The ID of the review that the comment is filed on. */
      #reviewID;

      /*
       * Access control state.
       */

      /** Whether the user has permission to verify issues that require it. */
      #canVerify;

      /** Whether the issue bar is interactive. */
      #interactive;

      /*
       * HTML elements.
       */

      /** The element for the actions area. */
      #actionsEl = null;

      /** The element for the issue status message text. */
      #messageEl = null;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (CommentBarIssueViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        super.initialize(options);
        console.assert(options.commentID, 'commentID must be provided to CommentIssueBarView.');
        console.assert(options.commentType, 'commentType must be provided to CommentIssueBarView.');
        console.assert(options.issueStatus, 'issueStatus must be provided to CommentIssueBarView.');
        console.assert(options.reviewID, 'reviewID must be provided to CommentIssueBarView.');
        this.#commentID = options.commentID;
        this.#commentType = options.commentType;
        this.#reviewID = options.reviewID;
        this.#interactive = !!options.interactive;
        this.#canVerify = !!options.canVerify;
        this.#issueManager = options.commentIssueManager || RB.PageManager.getPage().model.commentIssueManager;
      }

      /**
       * Handle initial rendering of the view.
       *
       * If this view is managing an existing HTML structure, state from that
       * structure will be loaded. Otherwise it will construct the structure.
       *
       * The action buttons and message will be updated whenever the issue
       * status changes.
       */
      onComponentInitialRender() {
        const options = this.initialComponentState.options;
        const el = this.el;
        if (options.isCompact) {
          el.classList.add('-is-compact');
        }
        if (el.children.length === 0) {
          if (!el.id) {
            el.id = `issue-bar-${options.commentID}`;
          }
          const labelID = `${el.id}__label`;
          el.setAttribute('aria-labelledby', labelID);

          /* This is a brand-new instance of the bar. */
          this.#actionsEl = ink.paintComponent("span", {
            "class": "rb-c-issue-bar__actions"
          });
          this.#messageEl = ink.paintComponent("label", {
            "class": "rb-c-issue-bar__message",
            id: labelID
          });

          /* Update the actions before we add to the DOM. */
          this.#updateIssueBar(options.issueStatus);
          ink.renderInto(el, [ink.paintComponent("span", {
            "class": "rb-c-issue-bar__icon",
            "aria-hidden": "true"
          }), this.#messageEl, this.#actionsEl, ink.paintComponent("a", {
            "class": "rb-c-issue-bar__all-issues-link",
            href: "#issue-summary"
          }, gettext("Show all issues"))]);
        } else {
          this.#actionsEl = el.querySelector('.rb-c-issue-bar__actions');
          this.#messageEl = el.querySelector('.rb-c-issue-bar__message');
          console.assert(this.#actionsEl, 'Missing rb-c-issue-bar__actions element');
          console.assert(this.#messageEl, 'Missing rb-c-issue-bar__message element');
          this.#updateIssueBar(options.issueStatus);
        }
        this.#issueManager;
        this.listenTo(this.#issueManager, `issueStatusUpdated:${this.#commentType}:${this.#commentID}`, this.#onIssueStatusUpdated);
      }

      /**
       * Return whether the current user can verify a given comment.
       *
       * This will check if the comment needs verification and whether the
       * current user is the one who filed the comment.
       *
       * Args:
       *     comment (RB.BaseComment):
       *         The comment to check.
       *
       * Returns:
       *     boolean:
       *     ``true`` if the issue needs verification and can be verified.
       *     ``false`` if it cannot.
       */
      #canVerifyComment(comment) {
        return this.#interactive && comment.requiresVerification() && comment.getAuthorUsername() !== RB.UserSession.instance.get('username');
      }

      /**
       * Set the issue status of the comment on the server.
       *
       * Args:
       *     newIssueStatus (CommentIssueStatusType):
       *         The new issue status.
       *
       *     clickedAction (string):
       *         The action that invoked this status update.
       *
       *         This is used to set the right states on the action buttons.
       */
      #setStatus(newIssueStatus, clickedAction) {
        const buttonEls = this.#actionsEl.querySelectorAll('.ink-c-button');
        for (const buttonEl of buttonEls) {
          if (buttonEl.dataset.action === clickedAction) {
            buttonEl.setAttribute('aria-busy', 'true');
          } else {
            buttonEl.disabled = true;
          }
        }
        this.#issueManager.setCommentIssueStatus({
          commentID: this.#commentID,
          commentType: this.#commentType,
          newIssueStatus: newIssueStatus,
          reviewID: this.#reviewID
        });
      }

      /**
       * Update the issue bar's actions and message based on the current state.
       *
       * This will rebuild the list of buttons for the new issue status, and
       * update the message and attributes.
       *
       * Args:
       *     issueStatus (CommentIssueStatusType):
       *         The issue status type to reflect.
       */
      #updateIssueBar(issueStatus) {
        const el = this.el;
        const actionsInfo = CommentIssueBarView.Actions;
        const statusInfo = CommentIssueBarView.StatusInfo[issueStatus];
        el.dataset.issueStatus = issueStatus;
        this.#messageEl.textContent = statusInfo.message;
        const actionEls = [];
        if (this.#interactive) {
          for (const action of statusInfo.actions) {
            const actionInfo = actionsInfo[action];
            console.assert(actionInfo, 'Invalid CommentIssueBarView action %s.', action);
            if (!actionInfo.requireCanVerify || this.#canVerify) {
              actionEls.push(ink.paintComponent("Ink.Button", {
                "data-action": action
              }, actionInfo.label));
            }
          }
        }
        ink.renderInto(this.#actionsEl, actionEls, {
          empty: true
        });
      }

      /**
       * Handle a change to an issue status.
       *
       * Args:
       *     eventData (object):
       *         Data from the event.
       */
      #onIssueStatusUpdated(eventData) {
        this.#updateIssueBar(eventData.newIssueStatus);
        this.trigger('statusChanged', eventData.oldIssueStatus, eventData.newIssueStatus);
      }

      /**
       * Handler for when "Drop" is clicked.
       *
       * Marks the issue as dropped.
       */
      async _onDropClicked() {
        const comment = this.#issueManager.getOrCreateComment({
          commentID: this.#commentID,
          commentType: this.#commentType,
          reviewID: this.#reviewID
        });
        await comment.ready();
        this.#setStatus(this.#canVerifyComment(comment) ? RB.CommentIssueStatusType.VERIFYING_DROPPED : RB.CommentIssueStatusType.DROPPED, 'drop');
      }

      /**
       * Handler for when "Re-open" is clicked.
       *
       * Reopens the issue.
       */
      _onReopenClicked() {
        this.#setStatus(RB.CommentIssueStatusType.OPEN, 'reopen');
      }

      /**
       * Handler for when "Fixed" is clicked.
       *
       * Marks the issue as fixed.
       */
      async _onFixedClicked() {
        const comment = this.#issueManager.getOrCreateComment({
          commentID: this.#commentID,
          commentType: this.#commentType,
          reviewID: this.#reviewID
        });
        await comment.ready();
        this.#setStatus(this.#canVerifyComment(comment) ? RB.CommentIssueStatusType.VERIFYING_RESOLVED : RB.CommentIssueStatusType.RESOLVED, 'resolve');
      }

      /**
       * Handler for when "Verify Dropped" is clicked.
       */
      _onVerifyDroppedClicked() {
        this.#setStatus(RB.CommentIssueStatusType.DROPPED, 'verify-dropped');
      }

      /**
       * Handler for when "Verify Fixed" is clicked.
       */
      _onVerifyResolvedClicked() {
        this.#setStatus(RB.CommentIssueStatusType.RESOLVED, 'verify-resolved');
      }
    }) || _class$i;

    var _dec$4, _class$h;
    /**
     * View for comment blocks on text-based files.
     *
     * This will show a comment indicator flag (a "ghost comment flag") beside the
     * content indicating there are comments there. It will also show the
     * number of comments, along with a tooltip showing comment summaries.
     *
     * This is meant to be used with a TextCommentBlock model.
     */
    let TextBasedCommentBlockView = (_dec$4 = spina.spina({
      prototypeAttrs: ['template']
    }), _dec$4(_class$h = class TextBasedCommentBlockView extends AbstractCommentBlockView {
      static tagName = 'span';
      static className = 'commentflag';
      static template = _.template(`<span class="commentflag-shadow"></span>
<span class="commentflag-inner">
 <span class="commentflag-count"></span>
</span>
<a name="<%= anchorName %>" class="commentflag-anchor"></a>`);

      /**********************
       * Instance variables *
       **********************/

      /** The element for the starting row of the comment. */
      $beginRow = null;

      /** The element for the ending row of the comment. */
      $endRow = null;

      /** The JQuery-wrapped window. */
      #$window = $(window);

      /** The saved height of the comment flag (in pixels). */
      #prevCommentHeight = null;

      /** The saved width of the window. */
      #prevWindowWidth = null;

      /** Whether the resize event handler is registered. */
      #resizeRegistered = false;

      /**
       * Render the contents of the comment flag.
       *
       * This will display the comment flag and then start listening for
       * events for updating the comment count or repositioning the comment
       * (for zoom level changes and wrapping changes).
       */
      renderContent() {
        this.$el.html(this.template(_.defaults(this.model.attributes, {
          anchorName: this.buildAnchorName()
        })));
        this.$('.commentflag-count').bindProperty('text', this.model, 'count', {
          elementToModel: false
        });
      }

      /**
       * Remove the comment from the page.
       *
       * Returns:
       *     TextBasedCommentBlockView:
       *     This object, for chaining.
       */
      remove() {
        if (this.#resizeRegistered) {
          this.#$window.off(`resize.${this.cid}`);
        }
        return super.remove();
      }

      /**
       * Set the row span for the comment flag.
       *
       * The comment will update to match the row of lines.
       *
       * Args:
       *     $beginRow (jQuery):
       *         The first row of the comment.
       *
       *     $endRow (jQuery):
       *         The last row of the comment. This may be the same as
       *         ``$beginRow``.
       */
      setRows($beginRow, $endRow) {
        this.$beginRow = $beginRow;
        this.$endRow = $endRow;

        /*
         * We need to set the sizes and show the element after other layout
         * operations and the DOM have settled.
         */
        _.defer(() => {
          this._updateSize();
          this.$el.show();
        });
        if ($beginRow && $endRow) {
          if (!this.#resizeRegistered) {
            this.#$window.on(`resize.${this.cid}`, _.bind(this._updateSize, this));
          }
        } else {
          if (this.#resizeRegistered) {
            this.#$window.off(`resize.${this.cid}`);
          }
        }
      }

      /**
       * Position the comment dialog relative to the comment flag position.
       *
       * The dialog will be positioned in the center of the page (horizontally),
       * just to the bottom of the flag.
       *
       * Args:
       *     commentDlg (RB.CommentDialogView):
       *          The view for the comment dialog.
       */
      positionCommentDlg(commentDlg) {
        commentDlg.$el.css({
          left: $(document).scrollLeft() + (this.#$window.width() - commentDlg.$el.width()) / 2,
          top: this.$endRow.offset().top + this.$endRow.height()
        });
      }

      /**
       * Position the comment update notifications bubble.
       *
       * The bubble will be positioned just to the top-right of the flag.
       *
       * Args:
       *     $bubble (jQuery):
       *         The selector for the notification bubble.
       */
      positionNotifyBubble($bubble) {
        $bubble.css({
          left: this.$el.width(),
          top: 0
        });
      }

      /**
       * Return the name for the comment flag anchor.
       *
       * Returns:
       *     string:
       *     The name to use for the anchor element.
       */
      buildAnchorName() {
        return `line${this.model.get('beginLineNum')}`;
      }

      /**
       * Update the size of the comment flag.
       */
      _updateSize() {
        const $endRow = this.$endRow;
        const windowWidth = this.#$window.width();
        if (this.#prevWindowWidth === windowWidth || $endRow.is(':hidden')) {
          /*
           * The view mode that the comment is on is hidden, so bail and
           * try again when its visible. Or the comment size has already
           * been calculated for this window size, so no-op.
           */
          return;
        }
        this.#prevWindowWidth = windowWidth;
        const $el = this.$el;

        /*
         * On IE and Safari, the marginTop in getExtents may be wrong.
         * We force a value that ends up working for us.
         */
        const commentHeight = $endRow.offset().top + $endRow.outerHeight() - this.$beginRow.offset().top - ($el.getExtents('m', 't') || -4);
        if (commentHeight !== this.#prevCommentHeight) {
          $el.height(commentHeight);
          this.#prevCommentHeight = commentHeight;
        }
      }
    }) || _class$h);

    var _class$g;

    /**
     * Displays the comment flag for a comment in the diff viewer.
     *
     * The comment flag handles all interaction for creating/viewing
     * comments, and will update according to any comment state changes.
     */
    let DiffCommentBlockView = spina.spina(_class$g = class DiffCommentBlockView extends TextBasedCommentBlockView {
      /**
       * Return the name for the comment flag anchor.
       *
       * Returns:
       *     string:
       *     The name to use for the anchor element.
       */
      buildAnchorName() {
        const fileDiffID = this.model.get('fileDiffID');
        const beginLineNum = this.model.get('beginLineNum');
        return `file${fileDiffID}line${beginLineNum}`;
      }
    }) || _class$g;

    var _class$f;
    /**
     * A view which gives the user hints about comments in other revisions.
     */
    let DiffCommentsHintView = spina.spina(_class$f = class DiffCommentsHintView extends spina.BaseView {
      static modelEvents = {
        'change': 'render'
      };

      /**
       * Render the view.
       */
      onRender() {
        const model = this.model;
        if (!model.get('hasOtherComments')) {
          this.$el.empty();
          return;
        }
        const headerText = gettext("You have unpublished comments on other revisions.");
        const bodyText = gettext("Your review consists of comments on the following revisions:");
        ink.renderInto(this.el, ink.paintComponent("Ink.Alert", {
          type: "warning"
        }, ink.paintComponent("Ink.Alert.Heading", null, headerText), ink.paintComponent("Ink.Alert.Content", null, ink.paintComponent("p", null, bodyText), ink.paintComponent("ul", null))), {
          empty: true
        });
        const $ul = this.$('ul');
        model.get('diffsetsWithComments').forEach(diffset => {
          const $li = $('<li>').appendTo($ul);
          const text = interpolate(gettext("Revision %(value1)s"), {
            "value1": diffset.revision
          }, true);
          if (diffset.isCurrent) {
            $li.text(text).addClass('-is-current');
          } else {
            $('<a href="#">').text(text).appendTo($li).on('click', e => {
              e.preventDefault();
              e.stopPropagation();
              this.trigger('revisionSelected', [0, diffset.revision]);
            });
          }
        });
        model.get('commitsWithComments').forEach(commit => {
          const $li = $('<li>').appendTo($ul);
          let text;
          if (commit.baseCommitID === null || commit.baseCommitID === commit.tipCommitID) {
            text = interpolate(gettext("Revision %(value1)s, commit %(value2)s"), {
              "value1": commit.revision,
              "value2": commit.tipCommitID.substring(0, 8)
            }, true);
          } else if (commit.tipCommitID === null) {
            text = interpolate(gettext("Revision %(value1)s, commit %(value2)s"), {
              "value1": commit.revision,
              "value2": commit.baseCommitID.substring(0, 8)
            }, true);
          } else {
            text = interpolate(gettext("Revision %(value1)s, commits %(value2)s - %(value3)s"), {
              "value1": commit.revision,
              "value2": commit.baseCommitID.substring(0, 8),
              "value3": commit.tipCommitID.substring(0, 8)
            }, true);
          }
          if (commit.isCurrent) {
            $li.text(text).addClass('-is-current');
          } else {
            $('<a href="#">').text(text).appendTo($li).on('click', e => {
              e.preventDefault();
              e.stopPropagation();
              this.trigger('commitRangeSelected', commit.revision, commit.baseCommitPK, commit.tipCommitPK);
            });
          }
        });
        model.get('interdiffsWithComments').forEach(interdiff => {
          const $li = $('<li>').appendTo($ul);
          const text = interpolate(gettext("Interdiff revision %(value1)s - %(value2)s"), {
            "value1": interdiff.oldRevision,
            "value2": interdiff.newRevision
          }, true);
          if (interdiff.isCurrent) {
            $li.text(text).addClass('-is-current');
          } else {
            $('<a href="#">').text(text).appendTo($li).on('click', e => {
              e.preventDefault();
              e.stopPropagation();
              this.trigger('revisionSelected', [interdiff.oldRevision, interdiff.newRevision]);
            });
          }
        });
      }
    }) || _class$f;

    var _class$e;

    /**
     * Options for the DiffComplexityIconView.
     *
     * Version Changed:
     *     7.0:
     *     Added ``iconSize``.
     *
     * Version Added:
     *     6.0
     */

    /**
     * Information on a segment of the diff complexity graph.
     *
     * Version Added:
     *     7.0
     */

    /**
     * The data backing the diff complexity graph.
     *
     * Version Added:
     *     7.0
     */

    /* Some useful constants we'll use a lot. */
    const HALF_PI = Math.PI / 2;
    const TAU = Math.PI * 2;
    const RADIANS_PER_DEGREE = Math.PI / 180;

    /**
     * Renders an icon showing the general complexity of a diff.
     *
     * This icon is a pie graph showing the percentage of inserts vs deletes
     * vs replaces. The size of the white inner radius is a relative indicator
     * of how large the change is for the file, representing the unchanged lines.
     * Smaller inner radiuses indicate much larger changes, whereas larger
     * radiuses represent smaller changes.
     *
     * Callers are not required to supply the total number of lines or the number
     * of replaces, allowing this to be used when only the most basic insert and
     * delete counts are available.
     *
     * Version Changed:
     *     7.0:
     *     This was rewritten to generate a SVG. It's effectively a full rewrite.
     */
    let DiffComplexityIconView = spina.spina(_class$e = class DiffComplexityIconView extends spina.BaseView {
      static className = 'rb-c-diff-complexity-icon';

      /** The default icon size for the graph in pixels. */
      static ICON_SIZE = 20;

      /**
       * The ratio of the inner radius to the total number of unchanged lines.
       *
       * Version Added:
       *     7.0
       */
      static _INNER_RADIUS_RATIO = 0.6;

      /**
       * The gap size between segments.
       *
       * Version Added:
       *     7.0
       */
      static _SEGMENT_GAP = 1.25;

      /**
       * The percentage of the icon size taken up by padding.
       *
       * This is a percentage a scale from 0 to 1.
       *
       * Version Added:
       *     7.0
       */
      static _PADDING_PCT = 0.2;

      /**
       * The minimum percentage value used for any segment.
       *
       * This is a percentage a scale from 0 to 1.
       *
       * Version Added:
       *     7.0
       */
      static _MIN_VALUE_PCT = 0.1;

      /**********************
       * Instance variables *
       **********************/

      /** The size of the icon in width and height. */
      iconSize = DiffComplexityIconView.ICON_SIZE;

      /** The number of deleted lines. */
      numDeletes = 0;

      /** The number of inserted lines. */
      numInserts = 0;

      /** The number of replaced lines. */
      numReplaces = 0;

      /** The total number of lines in the file. */
      totalLines = null;

      /**
       * Initialize the view.
       *
       * Each of the provided values will be normalized to something
       * the view expects.
       *
       * Args:
       *     options (DiffComplexityIconViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        if (options) {
          this.numInserts = options.numInserts || 0;
          this.numDeletes = options.numDeletes || 0;
          this.numReplaces = options.numReplaces || 0;
          this.totalLines = options.totalLines || null;
          this.iconSize = options.iconSize || this.iconSize;
        }
      }

      /**
       * Render the icon.
       *
       * This will calculate the data for the graph and then render it to an
       * inner SVG.
       */
      onInitialRender() {
        const graphData = this.#generateData();
        if (graphData === null) {
          /* There's nothing to render. */
          return;
        }

        /*
         * Determine the common positioning and segment data we're going to
         * work with.
         */
        const el = this.el;
        const segments = graphData.segments;
        const iconSize = this.iconSize;
        const center = iconSize / 2;
        const gap = DiffComplexityIconView._SEGMENT_GAP;

        /*
         * If we only have one segment, we'll need to handle rendering this
         * slightly differently, and avoid any gaps. Track this.
         */
        const wholeDonut = segments.length === 1;

        /*
         * Calculate our radiuses.
         *
         * We'll fudge the numbers a bit to add some padding around the
         * outside and to keep a reasonable ratio on the inside. It'll be
         * 75% of the available size.
         */
        const radius = Math.round(center * (1 - DiffComplexityIconView._PADDING_PCT));
        const totalLines = this.totalLines;
        const innerRadius = Math.max(wholeDonut ? 0 : gap, Math.ceil(center * DiffComplexityIconView._INNER_RADIUS_RATIO * (totalLines === null ? 1 : (totalLines - graphData.numTotal) / totalLines)));

        /* Set the size of our icon. */
        el.setAttribute('role', 'figure');
        el.style.width = `${iconSize}px`;
        el.style.height = `${iconSize}px`;

        /*
         * Build the outer SVG element.
         *
         * NOTE: JQuery can't create SVG elements, as it'll get the namespace
         *       wrong. Ink (as of this writing -- April 16, 2024) can't
         *       either. We must create by hand.
         */
        const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgEl.setAttribute('aria-hidden', 'true');
        svgEl.setAttribute('width', '100%');
        svgEl.setAttribute('height', '100%');
        svgEl.setAttribute('viewBox', `0 0 ${iconSize} ${iconSize}`);

        /* Begin building the graph data. */
        const titles = [];
        let startAngle = 0;
        for (const segment of segments) {
          const pct = segment.pct;
          let pathData;
          if (wholeDonut) {
            /*
             * Prepare the path data for the whole donut segment.
             * We'll be drawing two 180 degree semicircles each for the
             * outer and inner radiuses. This is needed because an arc
             * can't itself be 360 degrees.
             */
            pathData = `M ${center} ${center - radius}
A ${radius} ${radius}
  0 1 1
  ${center} ${center + radius}
A ${radius} ${radius}
  0 1 1
  ${center} ${center - radius}
M ${center} ${center - innerRadius}
A ${innerRadius} ${innerRadius}
  0 1 0
  ${center} ${center + innerRadius}
A ${innerRadius} ${innerRadius}
  0 1 0
  ${center} ${center - innerRadius}
Z`;
          } else {
            /*
             * Calculate the coordinates for each point in the segment's
             * arc, taking care to ensure a consistent gap between
             * segments.
             */
            const segmentAngleRadians = pct * 360 * RADIANS_PER_DEGREE;

            /*
             * We have to set the large-arc-path to 1 if greatr than 180
             * degrees in order for the arc to render correctly.
             */
            const largeArcPath = segmentAngleRadians > Math.PI ? 1 : 0;

            /*
             * Determine the gaps we want at both the inner and outer
             * points.
             *
             * If there's no inner radius (or a very tiny one), we could
             * get a NaN, so we always fall back on the gap.
             */
            const gapAngleOuter = Math.asin(gap / (2 * radius));
            const gapAngleInner = Math.asin(gap / (2 * innerRadius));

            /*
             * Calculate the coordinates of the inner and outer radiuses.
             */
            const endAngle = startAngle + segmentAngleRadians;
            const outerCoords = this.#getCoords(startAngle + gapAngleOuter, endAngle - gapAngleOuter, radius, center);
            const innerCoords = this.#getCoords(startAngle + gapAngleInner, endAngle - gapAngleInner, innerRadius, center);

            /*
             * Prepare the path data for the segment.
             *
             * We'll be drawing this as two arcs (an outer and inner),
             * with lines connecting them.
             */
            pathData = `M ${innerCoords[0]}
L ${outerCoords[0]}
A ${radius} ${radius}
  0 ${largeArcPath} 1
  ${outerCoords[1]}
L ${innerCoords[1]}
A ${innerRadius} ${innerRadius}
  0 ${largeArcPath} 0
  ${innerCoords[0]}
Z`;
          }
          const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          pathEl.classList.add(segment.className);
          pathEl.setAttribute('d', pathData);
          svgEl.appendChild(pathEl);
          titles.push(segment.title);
          startAngle += pct * TAU;
        }
        el.appendChild(svgEl);

        /* Generate a title for the graph showing the line counts. */
        const numTotal = graphData.numTotal;
        const titlesStr = titles.join(', ');
        const label = interpolate(ngettext("%(numTotal)s of %(totalLines)s line changed: %(titlesStr)s", "%(numTotal)s of %(totalLines)s lines changed: %(titlesStr)s", totalLines), {
          "numTotal": numTotal,
          "totalLines": totalLines,
          "titlesStr": titlesStr
        }, true);
        el.setAttribute('aria-label', label);
        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = label;
        svgEl.appendChild(titleEl);
      }

      /**
       * Return the start and end coordinates for an arc on a segment.
       *
       * This will determine the coordinates that make up the arc, and
       * return them as pairs of strings for placement insode of a
       * ``<path>``.
       *
       * Args:
       *     startAngle (number):
       *         The angle from the center for the start of the segment.
       *
       *     endAngle (number):
       *         The angle from the center for the end of the segment.
       *
       *     radius (number):
       *         The radius used for the arc.
       *
       *     center (number):
       *         The center of the graph.
       *
       * Returns:
       *     Array:
       *     A 2-array of strings, one for the starting coordinates and one
       *     for the ending coordinates.
       */
      #getCoords(startAngle, endAngle, radius, center) {
        const startRadians = startAngle - HALF_PI;
        const endRadians = endAngle - HALF_PI;
        const startX = center + radius * Math.cos(startRadians);
        const startY = center + radius * Math.sin(startRadians);
        const endX = center + radius * Math.cos(endRadians);
        const endY = center + radius * Math.sin(endRadians);
        return [`${startX} ${startY}`, `${endX} ${endY}`];
      }

      /**
       * Generate data for the graph.
       *
       * This will compute the inserts, deletes, and replaces, along with
       * styling and title data, returning data used for render.
       *
       * Any empty segments will be filtered out, and any that fall below a
       * minimum size will be capped to that minimum, taking away from the
       * size of the largest segment.
       *
       * Returns:
       *     GraphData:
       *     The generated graph data, or ``null`` if there's nothing to
       *     render.
       */
      #generateData() {
        const numInserts = this.numInserts;
        const numDeletes = this.numDeletes;
        const numReplaces = this.numReplaces;
        const numTotal = numInserts + numDeletes + numReplaces;
        if (numTotal === 0) {
          return null;
        }

        /*
         * Start by building a map of all data and filtering to segments with
         * non-0 percentages.
         */
        const minValuePct = DiffComplexityIconView._MIN_VALUE_PCT;
        let anyBelowMin = false;
        let availLen = 0;
        let largestOldIndex = null;
        let largestNewIndex = null;
        const segments = [{
          className: 'rb-c-diff-complexity-icon__insert',
          pct: numInserts / numTotal,
          title: interpolate(ngettext("%(numInserts)s line added", "%(numInserts)s lines added", numInserts), {
            "numInserts": numInserts
          }, true)
        }, {
          className: 'rb-c-diff-complexity-icon__delete',
          pct: numDeletes / numTotal,
          title: interpolate(ngettext("%(numDeletes)s line deleted", "%(numDeletes)s lines deleted", numDeletes), {
            "numDeletes": numDeletes
          }, true)
        }, {
          className: 'rb-c-diff-complexity-icon__replace',
          pct: numReplaces / numTotal,
          title: interpolate(ngettext("%(numReplaces)s line replaced", "%(numReplaces)s lines replaced", numReplaces), {
            "numReplaces": numReplaces
          }, true)
        }].filter((data, index, array) => {
          /* Filter out any segments that would be 0 in length. */
          if (data.pct <= 0) {
            return false;
          }

          /*
           * Check for any segments below the minimum value, and also
           * locate the largest segment.
           */
          if (data.pct < minValuePct) {
            anyBelowMin = true;
          } else if (largestOldIndex === null || data.pct > array[largestOldIndex].pct) {
            largestOldIndex = index;
            largestNewIndex = availLen;
          }
          availLen++;
          return true;
        });
        if (anyBelowMin) {
          /*
           * We now need to set some minimums and subtract from the largest
           * segment.
           */
          console.assert(largestNewIndex !== null);
          for (let i = 0; i < segments.length; i++) {
            const data = segments[i];
            if (data.pct < minValuePct) {
              const pctDiff = minValuePct - data.pct;
              data.pct = minValuePct;

              /* Subtract this from the largest segment. */
              segments[largestNewIndex].pct -= pctDiff;
            }
          }
        }
        return {
          numTotal: numTotal,
          segments: segments
        };
      }
    }) || _class$e;

    var _class$d, _class2$3, _class3$2;

    /**
     * A view for a dropdown menu within the unified banner.
     *
     * Version Added:
     *     6.0
     */
    let DraftModeMenu = spina.spina(_class$d = class DraftModeMenu extends spina.BaseView {
      static className = 'rb-c-unified-banner__menu';

      /**
       * The events to listen to.
       */
      static events = {
        'focusout': '_onFocusOut',
        'keydown': '_onKeyDown',
        'mouseenter': '_openMenu',
        'mouseleave': '_closeMenu',
        'touchstart': '_onTouchStart'
      };
      static modelEvents = {
        'change:draftModes change:selectedDraftMode': '_update'
      };

      /**********************
       * Instance variables *
       **********************/

      #$arrow;
      #$label;
      #menuView;

      /**
       * Render the view.
       */
      onInitialRender() {
        const labelID = 'unified-banner-mode-label';
        const menuView = ink.craftComponent("Ink.Menu", {
          "aria-labelledby": labelID,
          controllerEl: this.el
        });
        this.#menuView = menuView;
        ink.renderInto(this.el, [ink.paintComponent("a", {
          "class": "rb-c-unified-banner__mode",
          tabindex: "0"
        }, ink.paintComponent("label", {
          "class": "rb-c-unified-banner__menu-label",
          id: labelID
        }, ink.paintComponent("span", {
          "class": "rb-icon rb-icon-edit-review",
          "aria-hidden": "true"
        }), gettext("Mode")), ink.paintComponent("span", {
          "class": "ink-i-dropdown"
        })), menuView]);
        this.#$label = this.$('.rb-c-unified-banner__menu-label');
        this.#$arrow = this.$('.ink-i-dropdown');
        this._update();
      }

      /**
       * Open the menu.
       */
      _openMenu() {
        if (!this.#menuView.menuItems.isEmpty()) {
          this.#menuView.open({
            animate: false
          });
        }
      }

      /**
       * Close the menu.
       */
      _closeMenu() {
        if (!this.#menuView.menuItems.isEmpty()) {
          this.#menuView.close({
            animate: false
          });
        }
      }

      /**
       * Handle a focus-out event.
       *
       * Args:
       *     evt (FocusEvent):
       *         The event object.
       */
      _onFocusOut(evt) {
        evt.stopPropagation();

        /*
         * Only close the menu if the focus has moved to something outside of
         * this component.
         */
        const currentTarget = evt.currentTarget;
        if (!currentTarget.contains(evt.relatedTarget)) {
          this.#menuView.close({
            animate: false
          });
        }
      }

      /**
       * Handle a key down event.
       *
       * When the menu has focus, this will take care of handling keyboard
       * operations, allowing the menu to be opened or closed. Opening the menu
       * will transfer the focus to the menu items.
       *
       * Args:
       *     evt (KeyboardEvent):
       *         The keydown event.
       */
      _onKeyDown(evt) {
        if (evt.key === 'ArrowDown' || evt.key === 'ArrowUp' || evt.key === 'Enter' || evt.key === ' ') {
          evt.preventDefault();
          evt.stopPropagation();
          this.#menuView.open({
            animate: false,
            currentItemIndex: 0
          });
        } else if (evt.key === 'Escape') {
          evt.preventDefault();
          evt.stopPropagation();
          this.#menuView.close({
            animate: false
          });
        }
      }

      /**
       * Handle a touchstart event.
       *
       * Version Added:
       *    7.0.3
       *
       * Args:
       *     e (TouchEvent):
       *         The touch event.
       */
      _onTouchStart(e) {
        const $target = $(e.target);
        if (!($target.hasClass('.ink-c-menu__item') || $target.parents('.ink-c-menu__item').length)) {
          /* Open or close the menu if its not a touch on an item. */
          e.stopPropagation();
          e.preventDefault();
          if (this.#menuView.isOpen) {
            this._closeMenu();
          } else {
            this._openMenu();
          }
        }
      }

      /**
       * Update the state of the draft mode selector.
       */
      _update() {
        const model = this.model;
        const draftModes = model.get('draftModes');
        const selectedDraftMode = model.get('selectedDraftMode');
        const newMenuItems = [];
        for (let i = 0; i < draftModes.length; i++) {
          const text = draftModes[i].text;
          if (i === selectedDraftMode) {
            ink.renderInto(this.#$label[0], [ink.paintComponent("span", {
              "class": "rb-icon rb-icon-edit-review",
              "aria-hidden": "true"
            }), text], {
              empty: true
            });
          } else {
            newMenuItems.push(new ink.MenuItem({
              label: text,
              onClick: () => model.set('selectedDraftMode', i)
            }));
          }
        }
        this.#menuView.menuItems.reset(newMenuItems);
        this.#$arrow.toggle(draftModes.length > 1);
      }
    }) || _class$d;
    /**
     * The publish button.
     *
     * Version Added:
     *     6.0
     */
    let PublishButtonView = spina.spina(_class2$3 = class PublishButtonView extends ink.MenuButtonView {
      static modelEvents = {
        'change:draftModes change:selectedDraftMode': '_update'
      };

      /**********************
       * Instance variables *
       **********************/

      #$archiveCheckbox;
      #$trivialCheckbox;

      /**
       * Initialize the view.
       */
      initialize() {
        const reviewRequestEditor = this.model.get('reviewRequestEditor');
        const menuItems = new ink.MenuItemsCollection();
        let showSendEmailItem = null;
        if (reviewRequestEditor.get('showSendEmail')) {
          showSendEmailItem = new ink.MenuItem({
            checked: true,
            label: gettext("Send E-Mail"),
            type: ink.MenuItemType.CHECKBOX_ITEM
          });
          menuItems.add(showSendEmailItem);
        }
        const archiveItem = new ink.MenuItem({
          label: gettext("Archive after publishing"),
          type: ink.MenuItemType.CHECKBOX_ITEM
        });
        menuItems.add(archiveItem);
        super.initialize({
          dropdownButtonAriaLabel: gettext("Open publish options"),
          hasActionButton: true,
          label: gettext("Publish All"),
          menuAriaLabel: gettext("Publish options"),
          menuIconName: 'fa fa-gear',
          menuItems: menuItems,
          onActionButtonClick: () => {
            this.trigger('publish', {
              archive: archiveItem.get('checked'),
              trivial: showSendEmailItem === null || !showSendEmailItem.get('checked')
            });
          }
        });
      }

      /**
       * Handle the initial rendering of the menu button.
       */
      onComponentInitialRender() {
        super.onComponentInitialRender();
        this._update();
      }

      /**
       * Update the state of the publish button.
       */
      _update() {
        const model = this.model;
        const draftModes = model.get('draftModes');
        const selectedDraftMode = model.get('selectedDraftMode');
        if (!this.rendered || draftModes.length === 0) {
          return;
        }
        this.label = draftModes[selectedDraftMode].multiple ? gettext("Publish All") : gettext("Publish");
      }
    }) || _class2$3;
    /**
     * Options for the unified banner view.
     *
     * Version Added:
     *     6.0
     */
    /**
     * The unified banner.
     *
     * This is a unified, multi-mode banner that provides basic support for
     * publishing, editing, and discarding reviews, review requests, and
     * review replies.
     *
     * The banner displays at the top of the page under the topbar and floats to
     * the top of the browser window when the user scrolls down.
     *
     * Version Added:
     *     6.0
     */
    let UnifiedBannerView = spina.spina(_class3$2 = class UnifiedBannerView extends RB.FloatingBannerView {
      static instance = null;
      static events = {
        'click #btn-review-request-discard': '_discardDraft',
        'click .rb-c-unified-banner__unpublished-draft a': '_toggleViewUserDraft'
      };
      static modelEvents = {
        'change': '_update',
        'change:selectedDraftMode': '_scrollToReviewReply'
      };

      /**********************
       * Instance variables *
       **********************/

      /** The change description editor. */
      #$changedesc;

      /** The discard draft button. */
      #$discardButton;

      /**
       * The dock container.
       *
       * Version Added:
       *     7.0.3
       */
      #$dock;

      /** The container for all draft action buttons/menus. */
      #$draftActions;

      /** The link for accessing the interdiff for a new draft diff. */
      #$interdiffLink;

      /** The mode selector menu. */
      #$modeSelector;

      /** The container for all review-related controls in the banner. */
      #$review;

      /**
       * The message for showing other users' drafts to admins.
       *
       * Version Added:
       *     7.0.2
       */
      #$userDraftMessage = null;

      /** The draft mode menu. */
      #modeMenu;

      /** The publish button. */
      #publishButton;

      /** The review request editor view. */
      #reviewRequestEditorView;

      /**
       * Reset the UnifiedBannerView instance.
       *
       * This is used in unit tests to reset the state after tests run.
       */
      static resetInstance() {
        if (this.instance !== null) {
          this.instance.remove();
          this.instance = null;
        }
      }

      /**
       * Return the UnifiedBannerView instance.
       *
       * If the banner does not yet exist, this will create it.
       *
       * Args:
       *     required (boolean, optional):
       *         Whether the instance is required to exist.
       *
       * Returns:
       *     RB.UnifiedBannerView:
       *     The banner view.
       */
      static getInstance(required = false) {
        if (required) {
          console.assert(this.instance, 'Unified banner instance has not been created');
        }
        return this.instance;
      }

      /**
       * Initialize the banner.
       *
       * Args:
       *     options (object):
       *         Options for the banner. See :js:class:`RB.FloatingBannerView`
       *         for details.
       */
      initialize(options) {
        super.initialize(_$1.defaults(options, {
          $floatContainer: $('#page-container'),
          noFloatContainerClass: 'collapsed'
        }));
        this.#reviewRequestEditorView = options.reviewRequestEditorView;
        UnifiedBannerView.instance = this;
      }

      /**
       * Remove the banner from the DOM.
       *
       * This will stop tracking for the content viewport and then remove
       * the element.
       *
       * Returns:
       *     UnifiedBannerView:
       *     This instance, for chaining.
       */
      remove() {
        RB.contentViewport.untrackElement(this.el);
        return super.remove();
      }

      /**
       * Render the banner.
       */
      onInitialRender() {
        if (!RB.UserSession.instance.get('authenticated')) {
          return;
        }
        super.onInitialRender();
        const model = this.model;
        this.#$dock = this.$('.rb-c-unified-banner__dock');
        this.#$modeSelector = this.$('.rb-c-unified-banner__mode-selector');
        this.#$draftActions = this.$('.rb-c-unified-banner__draft-actions');
        this.#$review = this.$('.rb-c-unified-banner__review');
        this.#$changedesc = this.$('.rb-c-unified-banner__changedesc');
        this.#$interdiffLink = $(`<div class="rb-c-unified-banner__interdiff-link">
${gettext("This draft adds a new diff.")}
<a>${gettext("Show changes")}</a>
</div>`).appendTo(this.#$changedesc);
        this.#modeMenu = new DraftModeMenu({
          model: model
        });
        this.#modeMenu.renderInto(this.#$modeSelector);
        this.#publishButton = new PublishButtonView({
          model: model
        });
        this.#publishButton.$el.prependTo(this.#$draftActions);
        this.listenTo(this.#publishButton, 'publish', this.publish);
        this.#publishButton.render();
        this.#$discardButton = $(ink.paintComponent("Ink.Button", {
          id: "btn-review-request-discard"
        }, gettext("Discard"))).appendTo(this.#$draftActions);
        const reviewRequestEditor = model.get('reviewRequestEditor');
        const reviewRequest = model.get('reviewRequest');
        const $changeDescription = this.$('#field_change_description').html(reviewRequestEditor.get('changeDescriptionRenderedText')).toggleClass('editable', reviewRequestEditor.get('mutableByUser')).toggleClass('rich-text', reviewRequest.get('changeDescriptionRichText'));
        this.#reviewRequestEditorView.addFieldView(new ChangeDescriptionFieldView({
          el: $changeDescription,
          fieldID: 'change_description',
          model: reviewRequestEditor
        }));
        RB.contentViewport.trackElement({
          el: this.el,
          side: 'top'
        });
      }

      /**
       * Handle re-renders.
       */
      onRender() {
        this._update(true);
      }

      /**
       * Update the state of the banner.
       *
       * Version Changed:
       *     7.0:
       *     Added the ``forceUpdate`` argument.
       *
       * Args:
       *     forceUpdate (boolean, optional):
       *         Whether to force updating the state of the banner.
       *
       *         If not provided, this will only update if already rendered.
       *
       *         Version Added:
       *             7.0
       */
      _update(forceUpdate) {
        if (!this.rendered && !forceUpdate) {
          return;
        }
        const model = this.model;
        const draftModes = model.get('draftModes');
        const selectedDraftMode = model.get('selectedDraftMode');
        const numDrafts = model.get('numDrafts');
        const reviewRequest = model.get('reviewRequest');
        const reviewRequestPublic = reviewRequest.get('public');
        const userDraftMessage = model.get('userDraftMessage');
        this.#$discardButton.toggle(draftModes.length > 0 && !draftModes[selectedDraftMode].multiple);
        this.#$modeSelector.toggle(numDrafts > 0);
        this.#$draftActions.toggle(numDrafts > 0);
        this.#$changedesc.toggle(reviewRequestPublic && draftModes.length > 0 && draftModes[selectedDraftMode].hasReviewRequest);
        const interdiffLink = reviewRequest.draft.get('interdiffLink');
        if (interdiffLink) {
          this.#$interdiffLink.show().children('a').attr('href', interdiffLink);
        } else {
          this.#$interdiffLink.hide();
        }
        if (userDraftMessage) {
          if (this.#$userDraftMessage === null) {
            this.#$userDraftMessage = $('<div class="rb-c-unified-banner__unpublished-draft">').appendTo(this.getDock());
          }
          this.#$userDraftMessage.html(userDraftMessage);
        } else {
          if (this.#$userDraftMessage) {
            this.#$userDraftMessage.remove();
            this.#$userDraftMessage = null;
          }
        }
        this.$el.toggleClass('-has-draft', reviewRequestPublic === false || numDrafts > 0).toggleClass('-has-multiple', numDrafts > 1).show();
      }

      /**
       * Return the height of the banner.
       *
       * Args:
       *     withDock (boolean, optional):
       *         Whether to include the dock portion of the banner in the height
       *         value.
       *
       * Returns:
       *     number:
       *     The height of the banner, in pixels.
       */
      getHeight(withDock = true) {
        if (withDock) {
          return this.$el.outerHeight();
        } else {
          return this.#$review.outerHeight();
        }
      }

      /**
       * Return the dock element.
       *
       * Returns:
       *     JQuery:
       *     The dock element.
       */
      getDock() {
        return this.#$dock;
      }

      /**
       * Publish the current draft.
       *
       * This triggers an event which is handled by ReviewRequestEditorView.
       */
      async publish(options) {
        const model = this.model;
        const selectedDraftMode = model.get('selectedDraftMode');
        const draftModes = model.get('draftModes');
        const draftMode = draftModes[selectedDraftMode];
        const reviewRequestEditor = model.get('reviewRequestEditor');
        const reviewRequest = reviewRequestEditor.get('reviewRequest');
        const pendingReview = model.get('pendingReview');
        const reviewReplyDrafts = model.get('reviewReplyDrafts');
        const reviews = [];
        const reviewRequests = [];
        RB.ClientCommChannel.getInstance().reload();
        if (draftMode.hasReviewRequest) {
          await reviewRequest.ready();
          reviewRequests.push(reviewRequest.get('id'));
        }
        if (draftMode.hasReview) {
          await pendingReview.ready();
          reviews.push(pendingReview.get('id'));
        }
        if (draftMode.singleReviewReply !== undefined) {
          const reply = reviewReplyDrafts[draftMode.singleReviewReply];
          await reply.ready();
          reviews.push(reply.get('id'));
        } else if (draftMode.hasReviewReplies) {
          for (const reply of reviewReplyDrafts) {
            await reply.ready();
            reviews.push(reply.get('id'));
          }
        }
        await this.#reviewRequestEditorView.saveOpenEditors();
        try {
          await this.#runPublishBatch(reviewRequest.get('localSitePrefix'), reviewRequests, reviews, !!options.trivial, !!options.archive);
        } catch (err) {
          alert(err);
        }
        RB.navigateTo(reviewRequest.get('reviewURL'));
      }

      /**
       * Run the publish batch operation.
       *
       * Args:
       *     localSitePrefix (string):
       *         The URL prefix for the local site, if present.
       *
       *     reviewRequests (Array of number):
       *         The set of review request IDs to publish.
       *
       *     reviews (Array of number):
       *         The set of review IDs to publish.
       *
       *     trivial (boolean):
       *         Whether to suppress notification e-mails.
       *
       *     archive (boolean):
       *         Whether to archive the affected review request after publishing.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves when the operation is complete or rejects
       *     with an error string.
       */
      #runPublishBatch(localSitePrefix, reviewRequests, reviews, trivial, archive) {
        return new Promise((resolve, reject) => {
          RB.apiCall({
            data: {
              batch: JSON.stringify({
                archive: archive,
                op: 'publish',
                review_requests: reviewRequests,
                reviews: reviews,
                trivial: trivial
              })
            },
            url: `${SITE_ROOT}${localSitePrefix}r/_batch/`,
            error: xhr => {
              const rsp = xhr.responseJSON;
              if (rsp && rsp.stat) {
                reject(rsp.error);
              } else {
                console.error('Failed to run publish batch operation', xhr);
                reject(xhr.statusText);
              }
            },
            success: () => {
              resolve();
            }
          });
        });
      }

      /**
       * Discard the current draft.
       *
       * Depending on the selected view mode, this will either discard the
       * pending review, discard the current review request draft, or close the
       * (unpublished) review request as discarded.
       */
      async _discardDraft() {
        const model = this.model;
        const selectedDraftMode = model.get('selectedDraftMode');
        const draftModes = model.get('draftModes');
        const draftMode = draftModes[selectedDraftMode];
        const reviewRequest = model.get('reviewRequest');
        RB.ClientCommChannel.getInstance().reload();
        try {
          if ((await this._confirmDiscard(draftMode)) === false) {
            return;
          }
          if (draftMode.hasReview) {
            const pendingReview = model.get('pendingReview');
            await pendingReview.destroy();
            RB.navigateTo(reviewRequest.get('reviewURL'));
          } else if (draftMode.hasReviewRequest) {
            if (!reviewRequest.get('public')) {
              await reviewRequest.close({
                type: RB.ReviewRequest.CLOSE_DISCARDED
              });
            } else if (!reviewRequest.draft.isNew()) {
              await reviewRequest.draft.destroy();
            }
            RB.navigateTo(reviewRequest.get('reviewURL'));
          } else if (draftMode.singleReviewReply !== undefined) {
            const reviewReplyDrafts = model.get('reviewReplyDrafts');
            const reply = reviewReplyDrafts[draftMode.singleReviewReply];
            await reply.destroy();
          } else {
            console.error('Discard reached with no active drafts.');
          }
        } catch (err) {
          alert(err.xhr.errorText);
        }
      }

      /**
       * Ask the user to confirm a discard operation.
       *
       * Args:
       *     draftMode (DraftMode):
       *         The current draft mode being discarded.
       *
       * Returns:
       *     Promise:
       *     A promise which resolves to either ``true`` (proceed) or ``false``
       *     (cancel).
       */
      _confirmDiscard(draftMode) {
        return new Promise(resolve => {
          const text = draftMode.hasReview ? gettext("If you discard this review, all unpublished comments will be deleted.") : gettext("If you discard this review request draft, all unpublished data will be deleted.");
          const title = draftMode.hasReview ? gettext("Are you sure you want to discard this review?") : gettext("Are you sure you want to discard this review request draft?");
          function resolveAndClose(result) {
            resolve(result);
            $dlg.modalBox('destroy');
          }
          const $dlg = $('<p>').text(text).modalBox({
            buttons: [ink.paintComponent("Ink.Button", {
              onClick: () => resolveAndClose(false)
            }, gettext("Cancel")), ink.paintComponent("Ink.Button", {
              type: "danger",
              onClick: () => resolveAndClose(true)
            }, gettext("Discard"))],
            title: title
          }).on('close', () => {
            $dlg.modalBox('destroy');
            resolve(false);
          });
        });
      }

      /**
       * Handler for when the selected draft mode changes.
       *
       * If the newly selected mode is a review reply, scroll the document to
       * that review.
       */
      _scrollToReviewReply() {
        const selectedDraftMode = this.model.get('selectedDraftMode');
        const draftModes = this.model.get('draftModes');
        const draftMode = draftModes[selectedDraftMode];
        if (draftMode.singleReviewReply !== undefined) {
          const reviewReplyDrafts = this.model.get('reviewReplyDrafts');
          const reply = reviewReplyDrafts[draftMode.singleReviewReply];
          const originalReview = reply.get('parentObject').get('id');
          const $review = $(`#review${originalReview}`);
          const reviewTop = $review.offset().top;
          const bannerHeight = this.$el.outerHeight(true);
          $(document).scrollTop(reviewTop - bannerHeight - 20);
        }
      }

      /**
       * Toggle whether to view unpublished draft data owned by another user.
       *
       * It is up to the page view to reload based on this value changing.
       */
      _toggleViewUserDraft() {
        const reviewRequestEditor = this.model.get('reviewRequestEditor');
        const viewingUserDraft = reviewRequestEditor.get('viewingUserDraft');
        reviewRequestEditor.set('viewingUserDraft', !viewingUserDraft);
      }
    }) || _class3$2;

    var _class$c;

    /**
     * Options for the DiffFileIndexView.
     *
     * Version Added:
     *     6.0
     */

    /**
     * Storage for the extents of an element when scroll tracking.
     */

    /**
     * Displays the file index for the diffs on a page.
     *
     * The file page lists the names of the files, as well as a little graph
     * icon showing the relative size and complexity of a file, a list of chunks
     * (and their types), and the number of lines added and removed.
     */
    let DiffFileIndexView = spina.spina(_class$c = class DiffFileIndexView extends spina.BaseView {
      static chunkTemplate = _.template('<a href="#<%= chunkID %>" class="<%= className %>"> </a>');
      static itemTemplate = _.template(`<tr class="loading
 <% if (newfile) { %>new-file<% } %>
 <% if (binary) { %>binary-file<% } %>
 <% if (deleted) { %>deleted-file<% } %>
 <% if (modifiedFilename !== origFilename) { %>renamed-file<% } %>
 ">
 <td class="diff-file-icon">
  <span class="djblets-o-spinner"></span>
 </td>
 <td class="diff-file-info">
  <a href="#<%- index %>"><%- modifiedFilename %></a>
  <% if (modifiedFilename !== origFilename) { %>
  <span class="diff-file-rename"><%- wasText %></span>
  <% } %>
 </td>
 <td class="diff-chunks-cell">
  <% if (binary) { %>
   <%- binaryFileText %>
  <% } else if (deleted) { %>
   <%- deletedFileText %>
  <% } else { %>
   <div class="diff-chunks"></div>
  <% } %>
 </td>
</tr>`);
      static dockTemplate = `
        <div class="rb-c-diff-file-index-dock">
         <div class="rb-c-diff-file-index-dock__table"></div>
         <a href="#" class="rb-c-diff-file-index-dock__disclosure">
          <span class="fa fa-bars"></span>
         </a>
        </div>
    `;

      /**********************
       * Instance variables *
       **********************/

      /** The collection of diff files. */
      collection = null;

      /** Whether the index view is docked into the unified banner. */
      #isDocked = false;

      /** Whether the docked view is expanded. */
      #isDockExpanded = false;

      /** The remembered height of the view before it was docked. */
      #lastDockHeight;

      /** A mapping from the file index to the row in the table. */
      #diffFiles = new Map();

      /** The unified review banner. */
      #unifiedBannerView;

      /** The banner's dock element. */
      #$bannerDock = null;

      /** The banner's dock container. */
      #$dockContainer = null;

      /** The table used when docked. */
      #$dockTable = null;

      /**
       * The spacer element for floating mode.
       *
       * This is an element added to the page when we move the index from inline
       * mode into docked mode. This prevents a visual jump by maintaining space
       * for the file index in the main layout even though we've moved the
       * content into the banner.
       */
      #$floatSpacer = null;

      /** The individual index rows. */
      #$items = null;

      /** The index table. */
      #$itemsTable = null;

      /** The visual extents of the items in the index table. */
      #indexExtents = new Map();

      /** The visual extents of the files in the diff. */
      #diffExtents = new Map();

      /**
       * An ID for the queued updateLayout call.
       *
       * This is used to manage and re-schedule :js:meth:`updateLayout` calls.
       *
       * Version Added:
       *     6.0
       */
      #queueLayoutID = null;

      /**
       * The resize observer tracking changes to diff extents.
       *
       * Version Added:
       *     6.0
       */
      #resizeObserver = null;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (DiffFileIndexViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.collection = options.collection;
        this.listenTo(this.collection, 'reset update', this.#update);
      }

      /**
       * Remove the view from the DOM.
       *
       * Returns:
       *     DiffFileIndexView:
       *     This object, for chaining.
       */
      remove() {
        $(window).off(`scroll.${this.cid}`);
        if (this.#$floatSpacer !== null) {
          this.#$floatSpacer.remove();
          this.#$floatSpacer = null;
        }
        if (this.#$dockContainer !== null) {
          this.#$dockContainer.remove();
          this.#$dockContainer = null;
        }
        if (this.#resizeObserver !== null) {
          this.#resizeObserver.disconnect();
          this.#resizeObserver = null;
        }
        if (this.#queueLayoutID !== null) {
          cancelAnimationFrame(this.#queueLayoutID);
          this.#queueLayoutID = null;
        }
        this.#$bannerDock = null;
        this.#$dockTable = null;
        this.#$items = null;
        this.#$itemsTable = null;
        this.#indexExtents.clear();
        this.#diffExtents.clear();
        return super.remove();
      }

      /**
       * Render the view to the page.
       */
      onInitialRender() {
        // Remove the spinner.
        this.$el.empty();
        this.#$itemsTable = $('<table class="rb-c-diff-file-index">').appendTo(this.$el);
        this.#$items = this.$('tr');
        this.#unifiedBannerView = UnifiedBannerView.getInstance();

        /*
         * Listen for any resizes on the diffs we're tracking.
         *
         * We'll recalculate all extents any time a diff resizes (due to a
         * window resize or an expand/collapse.
         */
        this.#resizeObserver = new ResizeObserver(() => this.queueUpdateLayout());

        /*
         * Check both the feature and whether the banner exists, because it's
         * possible that it's not instantiated during some unit tests.
         */
        if (RB.EnabledFeatures.unifiedBanner && this.#unifiedBannerView !== null) {
          this.#$bannerDock = this.#unifiedBannerView.getDock();
          this.#$dockContainer = $(DiffFileIndexView.dockTemplate);
          this.#$dockTable = this.#$dockContainer.children('.rb-c-diff-file-index-dock__table');
          this.#$dockContainer.children('.rb-c-diff-file-index-dock__disclosure').click(e => this.#onDisclosureClicked(e));
          this.#$floatSpacer = this.$el.wrap($('<div>')).parent();
          $(window).on(`scroll.${this.cid}`, () => this.#updateFloatPosition());
          _.defer(() => this.#updateFloatPosition());
        }

        // Add the files from the collection
        this.#update();
      }

      /**
       * Clear the loaded diffs.
       */
      clear() {
        this.#diffFiles.clear();
        this.#diffExtents.clear();
        this.#indexExtents.clear();
      }

      /**
       * Add a loaded diff to the index.
       *
       * The reserved entry for the diff will be populated with a link to the
       * diff, and information about the diff.
       *
       * Args:
       *     index (number):
       *         The array index at which to add the new diff.
       *
       *     diffReviewableView (RB.DiffReviewableView):
       *         The view corresponding to the diff file being added.
       */
      addDiff(index, diffReviewableView) {
        const $item = $(this.#$items[index]).removeClass('loading');
        if (diffReviewableView.$el.hasClass('diff-error')) {
          this.#renderDiffError($item);
        } else {
          this.#renderDiffEntry($item, diffReviewableView);
        }
        this.#diffFiles.set(index, diffReviewableView.$el);
        if (this.#unifiedBannerView !== null) {
          this.queueUpdateLayout();
        }
        if (this.#isDocked) {
          this.#updateItemVisibility();
        }
        this.#resizeObserver.observe(diffReviewableView.el);
      }

      /**
       * Update the list of files in the index view.
       */
      #update() {
        const items = this.collection.map(file => $(DiffFileIndexView.itemTemplate(_.defaults({
          binaryFileText: gettext("Binary file"),
          deletedFileText: gettext("Deleted"),
          wasText: interpolate(gettext("Was %(value1)s"), {
            "value1": file.get('origFilename')
          }, true)
        }, file.attributes))));
        this.#$itemsTable.empty().append(items);
        this.#$items = this.#$itemsTable.find('tr');
      }

      /**
       * Render a diff loading error.
       *
       * An error icon will be displayed in place of the typical complexity
       * icon.
       *
       * Args:
       *     $item (jQuery):
       *         The item in the file index which encountered the error.
       */
      #renderDiffError($item) {
        $item.find('.diff-file-icon').html('<div class="rb-icon rb-icon-warning">').attr('title', gettext("There was an error loading this diff. See the details below."));
      }

      /**
       * Render the display of a loaded diff.
       *
       * Args:
       *     $item (jQuery):
       *         The item in the file index which was loaded.
       *
       *     diffReviewableView (RB.DiffReviewableView):
       *         The view corresponding to the diff file which was loaded.
       */
      #renderDiffEntry($item, diffReviewableView) {
        const $table = diffReviewableView.$el;
        const fileDeleted = $item.hasClass('deleted-file');
        const fileAdded = $item.hasClass('new-file');
        const linesEqual = $table.data('lines-equal');
        let numDeletes = 0;
        let numInserts = 0;
        let numReplaces = 0;
        let tooltip = '';
        if (fileAdded) {
          numInserts = 1;
        } else if (fileDeleted) {
          numDeletes = 1;
        } else if ($item.hasClass('binary-file')) {
          numReplaces = 1;
        } else {
          const chunksList = [];
          $table.children('tbody').each((i, chunk) => {
            const numRows = chunk.rows.length;
            const $chunk = $(chunk);
            if ($chunk.hasClass('delete')) {
              numDeletes += numRows;
            } else if ($chunk.hasClass('insert')) {
              numInserts += numRows;
            } else if ($chunk.hasClass('replace')) {
              numReplaces += numRows;
            } else {
              return;
            }
            chunksList.push(DiffFileIndexView.chunkTemplate({
              chunkID: chunk.id.substr(5),
              className: chunk.className
            }));
          });

          /* Add clickable blocks for each diff chunk. */
          $item.find('.diff-chunks').html(chunksList.join(''));
        }

        /* Render the complexity icon. */
        const iconView = new DiffComplexityIconView({
          numDeletes: numDeletes,
          numInserts: numInserts,
          numReplaces: numReplaces,
          totalLines: linesEqual + numDeletes + numInserts + numReplaces
        });

        /* Add tooltip for icon */
        if (fileAdded) {
          tooltip = gettext("New file");
        } else if (fileDeleted) {
          tooltip = gettext("Deleted file");
        } else {
          const tooltipParts = [];
          if (numInserts > 0) {
            tooltipParts.push(interpolate(ngettext("%s new line", "%s new lines", numInserts), [numInserts]));
          }
          if (numReplaces > 0) {
            tooltipParts.push(interpolate(ngettext("%s line changed", "%s lines changed", numReplaces), [numReplaces]));
          }
          if (numDeletes > 0) {
            tooltipParts.push(interpolate(ngettext("%s line removed", "%s lines removed", numDeletes), [numDeletes]));
          }
          tooltip = tooltipParts.join(', ');
        }
        $item.find('.diff-file-icon').empty().append(iconView.$el).attr('title', tooltip);
        $item.find('a').click(e => this._onAnchorClicked(e));
        iconView.render();
        this.listenTo(diffReviewableView, 'chunkDimmed chunkUndimmed', chunkID => {
          this.$(`a[href="#${chunkID}"]`).toggleClass('dimmed');
        });
      }

      /**
       * Handler for when an anchor is clicked.
       *
       * Gets the name of the target and emits anchorClicked.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The click event.
       */
      _onAnchorClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target;
        this.trigger('anchorClicked', target.href.split('#')[1]);
      }

      /**
       * Update the position of the file index.
       *
       * If the unified banner is available, this will dock the file index into
       * the banner once it's scrolled past.
       */
      #updateFloatPosition() {
        if (this.$el.parent().length === 0) {
          return;
        }
        const bannerTop = this.#$bannerDock.offset().top;
        const indexHeight = this.#$itemsTable.outerHeight(true);
        const topOffset = this.#$floatSpacer.offset().top - bannerTop;
        const lastRowHeight = this.#$itemsTable.children().last().outerHeight(true);
        if (!this.#isDocked && topOffset + indexHeight - lastRowHeight < 0) {
          /* Transition from undocked -> docked */

          this.$el.addClass('-is-docked');
          this.#isDocked = true;
          this.#$dockContainer.appendTo(this.#$bannerDock);
          this.#$dockTable.append(this.#$itemsTable);
          this.queueUpdateLayout();
          this.#updateItemVisibility();
        } else if (this.#isDocked && topOffset + indexHeight - lastRowHeight >= 0) {
          /* Transition from docked -> undocked. */

          this.#$floatSpacer.height('auto');
          this.$el.removeClass('-is-docked');
          this.#isDocked = false;
          this.#$itemsTable.css('transform', 'inherit').appendTo(this.$el);
          this.#$dockContainer.detach();
        } else if (this.#isDocked) {
          /* Currently docked. Update index scroll. */
          this.#updateItemVisibility();
        }
      }

      /**
       * Immediately update the stored sizes for the file index and diff entries.
       */
      updateLayout() {
        this.#indexExtents.clear();
        this.#diffExtents.clear();
        this.#$floatSpacer.height(this.#$itemsTable.outerHeight(true));
        const indexListTop = this.#$itemsTable.offset().top;
        const $items = this.#$items;
        const indexExtents = this.#indexExtents;
        const diffExtents = this.#diffExtents;
        for (const [i, $diffEl] of this.#diffFiles.entries()) {
          const $indexEl = $items.eq(i);
          const indexHeight = $indexEl.outerHeight();
          const indexTop = $indexEl.offset().top - indexListTop;
          const indexBottom = indexTop + indexHeight;
          indexExtents.set(i, {
            bottom: indexBottom,
            height: indexHeight,
            top: indexTop
          });
          const diffHeight = $diffEl.outerHeight();
          const diffTop = $diffEl.offset().top;
          const diffBottom = diffTop + diffHeight;
          diffExtents.set(i, {
            bottom: diffBottom,
            height: diffHeight,
            top: diffTop
          });
        }
        if (this.#isDocked) {
          this.#updateItemVisibility();
        }
        this.#queueLayoutID = null;
      }

      /**
       * Queue updating the stored sizes for the file index and diff entries.
       *
       * This will update the stored sizes at the next repaint opportunity. if
       * this is called more than once in-between updates, only one attempt
       * will be made, to avoid unnecessary calculations.
       *
       * This is recommended over calling :js:meth:`updateLayout` directly.
       *
       * Version Added:
       *     6.0
       */
      queueUpdateLayout() {
        if (this.#queueLayoutID === null) {
          this.#queueLayoutID = requestAnimationFrame(() => this.updateLayout());
        }
      }

      /**
       * Compute and return the index size for the visible area.
       *
       * Args:
       *     viewportTop (number):
       *         The top of the visible viewport, measured in pixels from the top
       *         of the document.
       *
       *     viewportBottom (number):
       *         The bottom of the visible viewport, measured in pixels from the
       *         top of the document.
       *
       * Returns:
       *     object:
       *     An object including the height and offset for the file index.
       */
      getDockedIndexExtents(viewportTop, viewportBottom) {
        const buffer = 50; // 50px
        let offset = undefined;
        let height = 0;
        let fullLastEntry = true;
        const diffExtents = this.#diffExtents;
        const indexExtents = this.#indexExtents;
        for (let i = 0; i < this.#$items.length; i++) {
          const diffExtent = diffExtents.get(i);
          const indexExtent = indexExtents.get(i);
          if (diffExtent === undefined) {
            /*
             * We may be trying to load an anchor prior to all the diffs
             * being fully loaded.
             */
            continue;
          }
          if (diffExtent.bottom < viewportTop) {
            // This entry is entirely above the visible viewport.
            continue;
          } else if (diffExtent.top > viewportBottom) {
            // This entry is below the visible viewport. We can bail now.
            break;
          }
          if (diffExtent.bottom < viewportTop + buffer) {
            /*
             * The bottom of the diff entry is in the process of being
             * scrolled off (or onto) the screen. Scroll the index
             * entry to match.
             */
            const ratio = (diffExtent.bottom - viewportTop) / buffer;
            const visibleArea = ratio * indexExtent.height;
            offset = indexExtent.bottom - visibleArea;
            height += visibleArea;
          } else if (diffExtent.top > viewportBottom - buffer) {
            /*
             * The top of the diff entry is in the process of being
             * scrolled off (or onto) the screen. Scroll the index
             * entry to match.
             */
            const ratio = (viewportBottom - diffExtent.top) / buffer;
            const visibleArea = ratio * indexExtent.height;
            height += visibleArea;
            fullLastEntry = false;
          } else {
            if (offset === undefined) {
              offset = indexExtent.top;
              if (offset > 0) {
                // Account for the border between <tr> elements.
                offset += 1;
              }
            }
            height += indexExtent.height;
          }
        }
        if (fullLastEntry) {
          // Account for the border between <tr> elements.
          height -= 1;
        }
        return {
          height: Math.round(height),
          offset: Math.round(offset)
        };
      }

      /**
       * Update the visibility state of the (docked) file list.
       *
       * When the file list is in docked mode, we carefully manage its vertical
       * offset and height in order to keep it in sync with which files are
       * visible on the screen.
       */
      #updateItemVisibility() {
        const $window = $(window);
        const bannerHeight = this.#unifiedBannerView.getHeight(false);
        const viewportTop = this.#$dockContainer.offset().top + bannerHeight;
        const viewportBottom = $window.scrollTop() + $window.height() - bannerHeight;
        const {
          height,
          offset
        } = this.getDockedIndexExtents(viewportTop, viewportBottom);
        if (this.#isDockExpanded) {
          this.#isDockExpanded = false;
          this.#$dockContainer.removeClass('-is-expanded');
        }
        window.requestAnimationFrame(() => {
          this.#lastDockHeight = height;
          this.#$dockTable.css('max-height', height);
          this.#$itemsTable.css('transform', `translateY(-${offset}px)`);
        });
      }

      /**
       * Handler for when the docked disclosure icon is clicked.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The click event.
       */
      #onDisclosureClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        this.#isDockExpanded = !this.#isDockExpanded;
        if (this.#isDockExpanded) {
          this.#$dockTable.css('max-height', this.#$itemsTable.outerHeight());
        } else {
          this.#$dockTable.css('max-height', this.#lastDockHeight);
        }
        this.#$dockContainer.toggleClass('-is-expanded', this.#isDockExpanded);
      }
    }) || _class$c;

    var _class$b;

    /**
     * Options for the TextCommentRowSelector view.
     *
     * Version Added:
     *     7.0
     */

    /**
     * Provides multi-line commenting capabilities for a diff.
     *
     * This tacks on commenting capabilities onto a DiffReviewableView's
     * element. It listens for mouse events that begin/end the creation of
     * a new comment.
     */
    let TextCommentRowSelector = spina.spina(_class$b = class TextCommentRowSelector extends spina.BaseView {
      static ghostCommentFlagTemplate = `<span class="commentflag ghost-commentflag">
 <span class="commentflag-shadow"></span>
 <span class="commentflag-inner"></span>
</span>`;
      static events = {
        'copy': '_onCopy',
        'mousedown': '_onMouseDown',
        'mouseout': '_onMouseOut',
        'mouseover': '_onMouseOver',
        'mouseup': '_onMouseUp',
        'touchcancel': '_onTouchCancel',
        'touchend': '_onTouchEnd',
        'touchmove': '_onTouchMove',
        'touchstart': '_onTouchStart'
      };

      /**********************
       * Instance variables *
       **********************/

      /** Options for the view. */

      /**
       * The row element of the beginning of the selection.
       *
       * This is public for consumption in unit tests.
       */
      _$begin = null;

      /**
       * The row element of the end of the selection.
       *
       * This is public for consumption in unit tests.
       */
      _$end = null;

      /**
       * The row index of the row last moused over/touched.
       *
       * This is public for consumption in unit tests.
       */
      _lastSeenIndex = 0;

      /**
       * The temporary comment flag.
       *
       * This is public for consumption in unit tests.
       */
      _$ghostCommentFlag = null;

      /**
       * The line number of the beginning of the selection.
       *
       * This is public for consumption in unit tests.
       */
      _beginLineNum = 0;

      /**
       * The line number of the end of the selection.
       *
       * This is public for consumption in unit tests.
       */
      _endLineNum = 0;

      /** The table cell that the ghost flag is on. */
      #$ghostCommentFlagCell = null;

      /** The type of newline character or sequence used in the file. */
      #newlineChar = null;

      /** The index of the currently selected cell. */
      #selectedCellIndex = null;

      /**
       * The class applied to elements while selecting text.
       *
       * This is used to keep the selection within one column.
       */
      #selectionClass = null;

      /** Whether the browser supports setting the clipboard contents. */
      #supportsSetClipboard;

      /**
       * Initialize the commenting selector.
       *
       * Args:
       *     options (TextCommentRowSelectorOptions):
       *         Options for initializing the view.
       */
      initialize(options) {
        this.options = options;

        /*
         * Support setting the clipboard only if we have the necessary
         * functions. This may still be turned off later if we can't
         * actually set the data.
         */
        this.#supportsSetClipboard = window.getSelection !== undefined && window.Range !== undefined && window.Range.prototype.cloneContents !== undefined;
      }

      /**
       * Remove the selector from the DOM.
       *
       * Returns:
       *     TextCommentRowSelector:
       *     This object, for chaining.
       */
      remove() {
        this._$ghostCommentFlag.remove();
        return super.remove();
      }

      /**
       * Render the selector.
       */
      onInitialRender() {
        this._$ghostCommentFlag = $(TextCommentRowSelector.ghostCommentFlagTemplate).on({
          mousedown: this._onMouseDown.bind(this),
          mouseout: this._onMouseOut.bind(this),
          mouseover: this._onMouseOver.bind(this),
          mouseup: this._onMouseUp.bind(this)
        }).hide().appendTo('body');
      }

      /**
       * Create a comment for a chunk of a diff.
       *
       * Args:
       *     beginLineNum (number):
       *         The first line number of the range being commented upon.
       *
       *     endLineNum (number):
       *         The last line number of the range being commented upon.
       *
       *     beginNode (Element):
       *         The element for the first row of the range being commented on.
       *
       *     endNode (Element):
       *         The element of the last row of the range being commented on.
       */
      createComment(beginLineNum, endLineNum, beginNode, endNode) {
        this._beginLineNum = beginLineNum;
        this._endLineNum = endLineNum;
        let $node = this._getActualLineNumCell($(beginNode)).parent();
        this._$begin = $node;
        $node = this._getActualLineNumCell($(endNode)).parent();
        this._$end = $node;
        if (this._isLineNumCell(endNode)) {
          this._end(this._$end);
        }
        this._reset();
      }

      /**
       * Return the beginning and end rows for a given line number range.
       *
       * Args:
       *      beginLineNum (number):
       *         The first line number of the range.
       *
       *      endLineNum (number):
       *         The last line number of the range.
       *
       *      minRowIndex (number):
       *         A minimum row index to constrain the search to.
       *
       *         No rows with indices less than this will be searched.
       *
       * Returns:
       *     array of Element:
       *     If the row corresponding to ``beginLineNum`` cannot be found, the
       *     return value with be ``null``.
       *
       *     Otherwise, this will be a 2 element array containing:
       *
       *     * The :js:class:`Element` for the row corresponding to
       *       ``beginLineNum``.
       *     * The :js:class:`Element` for the row corresponding to
       *       ``endLineNum``, or ``null`` if it cannot be found.
       */
      getRowsForRange(beginLineNum, endLineNum, minRowIndex) {
        const beginRowEl = this.findLineNumRow(beginLineNum, minRowIndex);
        if (beginRowEl) {
          const rowIndex = beginRowEl.rowIndex;
          const endRowEl = endLineNum === beginLineNum ? beginRowEl : this.findLineNumRow(endLineNum, rowIndex, rowIndex + endLineNum - beginLineNum);
          return [beginRowEl, endRowEl];
        } else {
          return null;
        }
      }

      /**
       * Find the row in a table matching the specified line number.
       *
       * This will perform a binary search of the lines trying to find
       * the matching line number. It will then return the row element,
       * if found.
       *
       * Args:
       *     lineNum (number):
       *         The line number to find.
       *
       *     startRow (number):
       *         The index of the row to start the search at.
       *
       *     endRow (number):
       *         The index of the row to end the sarch at.
       */
      findLineNumRow(lineNum, startRow, endRow) {
        const table = this.el;
        const rowOffset = 1; // Get past the headers.
        let row = null;
        if (table.rows.length - rowOffset > lineNum) {
          row = table.rows[rowOffset + lineNum];

          // Account for the "x lines hidden" row.
          if (row && this.getLineNum(row) === lineNum) {
            return row;
          }
        }
        if (startRow) {
          // startRow already includes the offset, so we need to remove it.
          startRow -= rowOffset;
        }
        let low = startRow || 0;
        let high = Math.min(endRow || table.rows.length, table.rows.length);
        if (endRow !== undefined && endRow < table.rows.length) {
          // See if we got lucky and found it in the last row.
          if (this.getLineNum(table.rows[endRow]) === lineNum) {
            return table.rows[endRow];
          }
        } else if (row !== null) {
          /*
           * We collapsed the rows (unless someone mucked with the DB),
           * so the desired row is less than the row number retrieved.
           */
          high = Math.min(high, rowOffset + lineNum);
        }

        // Binary search for this cell.
        for (let i = Math.round((low + high) / 2); low < high - 1;) {
          row = table.rows[rowOffset + i];
          if (!row) {
            // This should not happen, unless we miscomputed high.
            high--;

            /*
             * This won't do much if low + high is odd, but we'll catch
             * up on the next iteration.
             */
            i = Math.round((low + high) / 2);
            continue;
          }
          let value = this.getLineNum(row);
          if (!value) {
            /*
             * Bad luck, let's look around.
             *
             * We'd expect to find a value on the first try, but the
             * following makes sure we explore all rows.
             */
            let found = false;
            for (let j = 1; j <= (high - low) / 2; j++) {
              row = table.rows[rowOffset + i + j];
              if (row && this.getLineNum(row)) {
                i = i + j;
                found = true;
                break;
              } else {
                row = table.rows[rowOffset + i - j];
                if (row && this.getLineNum(row)) {
                  i = i - j;
                  found = true;
                  break;
                }
              }
            }
            if (found) {
              value = this.getLineNum(row);
            } else {
              return null;
            }
          }

          // See if we can use simple math to find the row quickly.
          const guessRowNum = lineNum - value + rowOffset + i;
          if (guessRowNum >= 0 && guessRowNum < table.rows.length) {
            const guessRow = table.rows[guessRowNum];
            if (guessRow && this.getLineNum(guessRow) === lineNum) {
              // We found it using maths!
              return guessRow;
            }
          }
          const oldHigh = high;
          const oldLow = low;
          if (value > lineNum) {
            high = i;
          } else if (value < lineNum) {
            low = i;
          } else {
            return row;
          }

          /*
           * Make sure we don't get stuck in an infinite loop. This can
           * happen when a comment is placed in a line that isn't being
           * shown.
           */
          if (oldHigh === high && oldLow === low) {
            break;
          }
          i = Math.round((low + high) / 2);
        }

        // Well.. damn. Ignore this then.
        return null;
      }

      /**
       * Begin the selection of line numbers.
       *
       * Args:
       *     $row (jQuery):
       *         The selected row.
       */
      _begin($row) {
        const lineNum = this.getLineNum($row[0]);
        this._$begin = $row;
        this._$end = $row;
        this._beginLineNum = lineNum;
        this._endLineNum = lineNum;
        this._lastSeenIndex = $row[0].rowIndex;
        $row.addClass('selected');
        this.$el.disableSelection();
      }

      /**
       * Finalize the selection and pop up a comment dialog.
       *
       * Args:
       *     $row (jQuery):
       *         The selected row.
       */
      _end($row) {
        if (this._beginLineNum === this._endLineNum) {
          /* See if we have a comment flag on the selected row. */
          const $commentFlag = $row.find('.commentflag');
          if ($commentFlag.length === 1) {
            $commentFlag.click();
            return;
          }
        }

        /*
         * Selection was finalized. Create the comment block
         * and show the comment dialog.
         */
        this.options.reviewableView.createAndEditCommentBlock({
          $beginRow: this._$begin,
          $endRow: this._$end,
          beginLineNum: this._beginLineNum,
          endLineNum: this._endLineNum
        });
      }

      /**
       * Add a row to the selection.
       *
       * This will update the selection range and mark the rows as selected.
       *
       * This row is assumed to be the most recently selected row, and
       * will mark the new beginning or end of the selection.
       *
       * Args:
       *     $row (jQuery):
       *         The row to add to the selection.
       */
      _addRow($row) {
        /* We have an active selection. */
        const lineNum = this.getLineNum($row[0]);
        if (lineNum < this._beginLineNum) {
          this._$begin = $row;
          this._beginLineNum = lineNum;
        } else if (lineNum > this._beginLineNum) {
          this._$end = $row;
          this._endLineNum = lineNum;
        }
        const min = Math.min(this._lastSeenIndex, $row[0].rowIndex);
        const max = Math.max(this._lastSeenIndex, $row[0].rowIndex);
        for (let i = min; i <= max; i++) {
          $(this.el.rows[i]).addClass('selected');
        }
        this._lastSeenIndex = $row[0].rowIndex;
      }

      /**
       * Highlight a row.
       *
       * This will highlight a row and show a ghost comment flag. This is done
       * when the mouse hovers over the row.
       *
       * Args:
       *     $row (jQuery):
       *         The row to highlight.
       */
      _highlightRow($row) {
        const $lineNumCell = $($row[0].cells[0]);

        /* See if we have a comment flag in here. */
        if ($lineNumCell.find('.commentflag').length === 0) {
          this._$ghostCommentFlag.css('top', $row.offset().top - 1).show().parent().removeClass('selected');
          this.#$ghostCommentFlagCell = $lineNumCell;
        }
        $row.addClass('selected');
      }

      /**
       * Remove old rows from the selection based on the most recent selection.
       *
       * Args:
       *     $row (jQuery):
       *         The most recent row selection.
       */
      _removeOldRows($row) {
        const destRowIndex = $row[0].rowIndex;
        if (destRowIndex >= this._$begin[0].rowIndex) {
          if (this._lastSeenIndex !== this._$end[0].rowIndex && this._lastSeenIndex < destRowIndex) {
            /*
             * We're removing from the top of the range. The beginning
             * location will need to be moved.
             */
            this._removeSelectionClasses(this._lastSeenIndex, destRowIndex);
            this._$begin = $row;
            this._beginLineNum = this.getLineNum($row[0]);
          } else {
            /*
             * We're removing from the bottom of the selection. The end
             * location will need to be moved.
             */
            this._removeSelectionClasses(destRowIndex, this._lastSeenIndex);
            this._$end = $row;
            this._endLineNum = this.getLineNum($row[0]);
          }
          this._lastSeenIndex = destRowIndex;
        }
      }

      /**
       * Reset the selection information.
       */
      _reset() {
        if (this._$begin) {
          /* Reset the selection. */
          this._removeSelectionClasses(this._$begin[0].rowIndex, this._$end[0].rowIndex);
          this._$begin = null;
          this._$end = null;
          this._beginLineNum = 0;
          this._endLineNum = 0;
          this._lastSeenIndex = 0;
        }
        this.#$ghostCommentFlagCell = null;

        /* Re-enable text selection on IE */
        this.$el.enableSelection();
      }

      /**
       * Remove the selection classes on a range of rows.
       *
       * Args:
       *     startRowIndex (number):
       *         The row index to start removing selection classes at.
       *
       *     endRowIndex (number):
       *         The row index to stop removing selection classes at.
       */
      _removeSelectionClasses(startRowIndex, endRowIndex) {
        for (let i = startRowIndex; i <= endRowIndex; i++) {
          $(this.el.rows[i]).removeClass('selected');
        }
      }

      /**
       * Return whether a particular cell is a line number cell.
       *
       * Args:
       *     cell (Element):
       *         The cell to inspect.
       */
      _isLineNumCell(cell) {
        return cell.tagName === 'TH' && cell.parentNode.getAttribute('line');
      }

      /**
       * Return the actual cell node in the table.
       *
       * If the node specified is the ghost flag, this will return the
       * cell the ghost flag represents.
       *
       * If this is a comment flag inside a cell, this will return the
       * comment flag's parent cell.
       *
       * If this is a code warning indicator, this will return its parent cell.
       *
       * Args:
       *     $node (jQuery):
       *         A node in the table.
       *
       * Returns:
       *     jQuery:
       *     The row.
       */
      _getActualLineNumCell($node) {
        if ($node.hasClass('commentflag')) {
          if ($node[0] === this._$ghostCommentFlag[0]) {
            return this.#$ghostCommentFlagCell;
          } else {
            return $node.parent();
          }
        } else if ($node.hasClass('fa-warning')) {
          return $node.parent();
        }
        return $node;
      }

      /**
       * Handler for when the user copies text in a column.
       *
       * This will begin the process of capturing any selected text in
       * a column to the clipboard in a cross-browser way.
       *
       * Args:
       *     e (JQuery.TriggeredEvent):
       *         The clipboard event.
       */
      _onCopy(e) {
        const clipboardEvent = e.originalEvent;
        const clipboardData = clipboardEvent.clipboardData;
        if (clipboardData && this.#supportsSetClipboard && this._copySelectionToClipboard(clipboardData)) {
          /*
           * Prevent the default copy action from occurring.
           */
          e.preventDefault();
          e.stopPropagation();
        }
      }

      /**
       * Find the pre tags and push them into the result array.
       *
       * Args:
       *     result (array):
       *         The array for which all matching ``<pre>`` elements will be
       *         pushed into.
       *
       *     parentEl (Element):
       *         The parent element to search under.
       *
       *     tdClass (string):
       *         The class of ``<td>`` elements to search.
       *
       *     excludeTBodyClass (string):
       *         The class of the ``<tbody>`` to exclude.
       */
      _findPreTags(result, parentEl, tdClass, excludeTBodyClass) {
        for (let i = 0; i < parentEl.children.length; i++) {
          const node = parentEl.children[i];
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'PRE') {
              result.push(node);
            } else if ((node.tagName !== 'TD' || $(node).hasClass(tdClass)) && (node.tagName !== 'TBODY' || !$(node).hasClass(excludeTBodyClass))) {
              this._findPreTags(result, node, tdClass, excludeTBodyClass);
            }
          }
        }
      }

      /**
       * Copy the current selection to the clipboard.
       *
       * This will locate the desired text to copy, based on the selection
       * range within the column where selection started. It will then
       * extract the code from the ``<pre>`` tags and build a string to set in
       * the clipboard.
       *
       * This requires support in the browser for setting clipboard contents
       * on copy. If the browser does not support this, the default behavior
       * will be used.
       *
       * Args:
       *     clipboardData (DataTransfer):
       *         The clipboard data from the copy event.
       *
       * Returns:
       *     boolean:
       *     Whether or not we successfully set the clipboard data.
       */
      _copySelectionToClipboard(clipboardData) {
        let excludeTBodyClass;
        let tdClass;
        if (this.#newlineChar === null) {
          /*
           * Figure out what newline character should be used on this
           * platform. Ideally, we'd determine this from some browser
           * behavior, but it doesn't seem that can be consistently
           * determined.
           */
          if (navigator.appVersion.includes('Win')) {
            this.#newlineChar = '\r\n';
          } else {
            this.#newlineChar = '\n';
          }
        }
        if (this.#selectedCellIndex === 3 || this.$el.hasClass('newfile')) {
          tdClass = 'r';
          excludeTBodyClass = 'delete';
        } else {
          tdClass = 'l';
          excludeTBodyClass = 'insert';
        }
        const sel = window.getSelection();
        const textParts = [];
        for (let i = 0; i < sel.rangeCount; i++) {
          const range = sel.getRangeAt(i);
          if (range.collapsed) {
            continue;
          }
          const nodes = [];
          const doc = range.cloneContents();
          this._findPreTags(nodes, doc, tdClass, excludeTBodyClass);
          if (nodes.length > 0) {
            /*
             * The selection spans multiple rows. Find the blocks of text
             * in the column we want, and copy those to the clipboard.
             */
            for (let j = 0; j < nodes.length; j++) {
              textParts.push(nodes[j].textContent);
            }
          } else {
            /*
             * If we're here, then we selected a subset of a single
             * cell. There was only one Range, and no <pre> tags as
             * part of it. We can just grab the text of the document.
             *
             * (We don't really need to break here, but we're going to
             * in order to be clear that we're completely done.)
             */
            textParts.push($(doc).text());
            break;
          }
        }
        try {
          clipboardData.setData('text', textParts.join(this.#newlineChar));
        } catch (e) {
          /* Let the native behavior take over. */
          this.#supportsSetClipboard = false;
          return false;
        }
        return true;
      }

      /**
       * Handle the mouse down event, which begins selection for comments.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``mousedown`` event.
       */
      _onMouseDown(e) {
        if (this.#selectionClass) {
          this.$el.removeClass(this.#selectionClass);
        }
        const node = this.#$ghostCommentFlagCell ? this.#$ghostCommentFlagCell[0] : e.target;
        if (this._isLineNumCell(node)) {
          this._begin($(node.parentNode));
        } else {
          const $node = node.tagName === 'TD' ? $(node) : $(node).parentsUntil('tr', 'td');
          if ($node.length > 0) {
            this.#selectionClass = 'selecting-col-' + $node[0].cellIndex;
            this.#selectedCellIndex = $node[0].cellIndex;
            this.$el.addClass(this.#selectionClass);
          }
        }
      }

      /**
       * Handle the mouse up event.
       *
       * This will finalize the selection of a range of lines, creating a new
       * comment block and displaying the dialog.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``mouseup`` event.
       */
      _onMouseUp(e) {
        const node = this.#$ghostCommentFlagCell ? this.#$ghostCommentFlagCell[0] : e.target;
        if (this._isLineNumCell(node)) {
          const $node = this._getActualLineNumCell($(node).parent());
          this._end($node);
          e.stopImmediatePropagation();
        }
        this._reset();
      }

      /**
       * Handle the mouse over event.
       *
       * This will update the selection, if there is one, to include this row
       * in the range, and set the "selected" class on the new row.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``mouseover`` event.
       */
      _onMouseOver(e) {
        const $node = this._getActualLineNumCell($(e.target));
        const $row = $node.parent();
        if (this._isLineNumCell($node[0])) {
          if (this._$begin) {
            this._addRow($row);
          } else {
            this._highlightRow($row);
          }
        } else if (this.#$ghostCommentFlagCell && $node[0] !== this.#$ghostCommentFlagCell[0]) {
          $row.removeClass('selected');
        }
      }

      /**
       * Handle the mouse out event.
       *
       * This will remove any lines outside the new range from the selection.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``mouseout`` event.
       */
      _onMouseOut(e) {
        const relTarget = e.relatedTarget;
        if (relTarget !== this._$ghostCommentFlag[0]) {
          this._$ghostCommentFlag.hide();
          this.#$ghostCommentFlagCell = null;
        }
        const $node = this._getActualLineNumCell($(e.target));
        if (this._$begin) {
          if (relTarget && this._isLineNumCell(relTarget)) {
            this._removeOldRows($(relTarget.parentNode));
          }
        } else if ($node && this._isLineNumCell($node[0])) {
          /*
           * Opera seems to generate lots of spurious mouse-out
           * events, which would cause us to get all sorts of
           * errors in here unless we check the target above.
           */
          $node.parent().removeClass('selected');
        }
      }

      /**
       * Handle the beginning of a touch event.
       *
       * If the user is touching a line number, then this will begin tracking
       * a new comment selection state, allowing them to either open an existing
       * comment or create a new one.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``touchstart`` event.
       */
      _onTouchStart(e) {
        const touchEvent = e.originalEvent;
        const firstTouch = touchEvent.targetTouches[0];
        const $node = this._getActualLineNumCell($(firstTouch.target));
        if ($node !== null && this._isLineNumCell($node[0])) {
          e.preventDefault();
          this._begin($node.parent());
        }
      }

      /**
       * Handle the end of a touch event.
       *
       * If the user ended on a line number, then this will either open an
       * existing comment (if the result was a single-line selection on the
       * line of an existing comment) or create a new comment spanning all
       * selected lines.
       *
       * If they ended outside of the line numbers column, then this will
       * simply reset the selection.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``touchend`` event.
       */
      _onTouchEnd(e) {
        const touchEvent = e.originalEvent;
        const firstTouch = touchEvent.changedTouches[0];
        const target = document.elementFromPoint(firstTouch.clientX, firstTouch.clientY);
        const $node = this._getActualLineNumCell($(target));
        if ($node !== null && this._isLineNumCell($node[0])) {
          e.preventDefault();
          this._end($node.parent());
        }
        this._reset();
      }

      /**
       * Handle touch movement events.
       *
       * If selecting up or down line numbers, this will update the selection
       * to span all rows from the original line number first touched and the
       * line number currently being touched.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``touchmove`` event.
       */
      _onTouchMove(e) {
        const touchEvent = e.originalEvent;
        const firstTouch = touchEvent.targetTouches[0];
        const target = document.elementFromPoint(firstTouch.clientX, firstTouch.clientY);
        const $node = this._getActualLineNumCell($(target));
        if ($node !== null) {
          const $row = $node.parent();
          if (this._lastSeenIndex !== $row[0].rowIndex && this._isLineNumCell($node[0])) {
            e.preventDefault();
            this._removeOldRows($row);
            this._addRow($row);
          }
        }
      }

      /**
       * Handle touch cancellation events.
       *
       * This resets the line number selection. The user will need to begin the
       * selection again.
       */
      _onTouchCancel() {
        this._reset();
      }

      /**
       * Return the line number for a row.
       *
       * Args:
       *     row (Element):
       *         The element to get the line number for.
       *
       * Returns:
       *     number:
       *     The line number.
       */
      getLineNum(row) {
        return parseInt(row.getAttribute('line'), 10);
      }
    }) || _class$b;

    var _class$a;

    /**
     * Handles reviews of the diff for a file.
     *
     * This provides commenting abilities for ranges of lines on a diff, as well
     * as showing existing comments, and handling other interaction around
     * per-file diffs.
     */
    let DiffReviewableView = spina.spina(_class$a = class DiffReviewableView extends AbstractReviewableView {
      static tagName = 'table';
      static commentBlockView = DiffCommentBlockView;
      static commentsListName = 'diff_comments';
      static events = {
        'click .diff-expand-btn': '_onExpandChunkClicked',
        'click .download-link': '_onDownloadLinkClicked',
        'click .moved-to, .moved-from': '_onMovedLineClicked',
        'click .rb-c-diff-collapse-button': '_onCollapseChunkClicked',
        'click .rb-o-toggle-ducs': '_onToggleUnicodeCharsClicked',
        'click .show-deleted-content-action': '_onShowDeletedClicked',
        'click thead tr': '_onFileHeaderClicked',
        'mouseup': '_onMouseUp'
      };

      /**********************
       * Instance variables *
       **********************/

      /**
       * The manager for centering various controls.
       *
       * This is public for consupmtion in unit tests.
       */

      /**
       * The row selector object.
       *
       * This is public for consupmtion in unit tests.
       */

      /** The row containing the filename(s). */
      #$filenameRow = null;

      /** The parent element for the view. */
      #$parent;

      /** The row containing the file revisions. */
      #$revisionRow = null;

      /** The wrapped window object. */
      #$window = $(window);

      /** The reserved widths for the content columns. */
      #colReservedWidths = 0;

      /** The reserved widths for the filename columns. */
      #filenameReservedWidths = 0;

      /** The comment blocks which are currently hidden in collapsed lines. */
      #hiddenCommentBlockViews = [];

      /** The number of columns in the table. */
      #numColumns = 0;

      /** The number of filename columns in the table. */
      #numFilenameColumns = 0;

      /** The saved content column width of the table. */
      #prevContentWidth = 0;

      /** The saved filename column width of the table. */
      #prevFilenameWidth = 0;

      /** The saved full width of the table. */
      #prevFullWidth = 0;

      /** The comment blocks which are currently visible. */
      #visibleCommentBlockViews = [];

      /**
       * Initialize the reviewable for a file's diff.
       */
      initialize() {
        super.initialize();
        this._selector = new TextCommentRowSelector({
          el: this.el,
          reviewableView: this
        });

        /*
         * Wrap this only once so we don't have to re-wrap every time
         * the page scrolls.
         */
        this.#$parent = this.$el.parent();
        this.on('commentBlockViewAdded', this._placeCommentBlockView, this);
      }

      /**
       * Remove the reviewable from the DOM.
       *
       * Returns:
       *     DiffReviewableView:
       *     This object, for chaining.
       */
      remove() {
        this._selector.remove();
        return super.remove();
      }

      /**
       * Render the reviewable.
       */
      onInitialRender() {
        super.onInitialRender();
        this._centered = new RB.CenteredElementManager();
        const $thead = $(this.el.tHead);
        this.#$revisionRow = $thead.children('.revision-row');
        this.#$filenameRow = $thead.children('.filename-row');
        this._selector.render();
        _.each(this.$el.children('tbody.binary'), thumbnailEl => {
          const $thumbnail = $(thumbnailEl);
          const id = $thumbnail.data('file-id');
          const $caption = $thumbnail.find('.file-caption .edit');
          const reviewRequest = this.model.get('reviewRequest');
          const fileAttachment = reviewRequest.createFileAttachment({
            id: id
          });
          if (!$caption.hasClass('empty-caption')) {
            fileAttachment.set('caption', $caption.text());
          }
        });
        this._precalculateContentWidths();
        this._updateColumnSizes();
      }

      /*
       * Toggles the display of whitespace-only chunks.
       */
      toggleWhitespaceOnlyChunks() {
        this.$('tbody tr.whitespace-line').toggleClass('dimmed');
        _.each(this.$el.children('tbody.whitespace-chunk'), chunk => {
          const $chunk = $(chunk);
          const dimming = $chunk.hasClass('replace');
          $chunk.toggleClass('replace');
          const $children = $chunk.children();
          $children.first().toggleClass('first');
          $children.last().toggleClass('last');
          const chunkID = chunk.id.split('chunk')[1];
          if (dimming) {
            this.trigger('chunkDimmed', chunkID);
          } else {
            this.trigger('chunkUndimmed', chunkID);
          }
        });

        /*
         * Swaps the visibility of the "This file has whitespace changes"
         * tbody and the chunk siblings.
         */
        this.$el.children('tbody.whitespace-file').siblings('tbody').addBack().toggle();
      }

      /**
       * Create a comment for a chunk of a diff.
       *
       * Args:
       *     beginLineNum (number)
       *         The first line of the diff to comment on.
       *
       *     endLineNum (number):
       *         The last line of the diff to comment on.
       *
       *     beginNode (Element):
       *         The row corresponding to the first line of the diff being
       *         commented upon.
       *
       *     endNode (Element):
       *         The row corresponding to the last line of the diff being
       *         commented upon.
       */
      createComment(beginLineNum, endLineNum, beginNode, endNode) {
        this._selector.createComment(beginLineNum, endLineNum, beginNode, endNode);
      }

      /**
       * Place a CommentBlockView on the page.
       *
       * This will compute the row range for the CommentBlockView and then
       * render it to the screen, if the row range exists.
       *
       * If it doesn't exist yet, the CommentBlockView will be stored in the
       * list of hidden comment blocks for later rendering.
       *
       * Args:
       *     commentBlockView (RB.DiffCommentBlockView):
       *         The comment block view to place.
       *
       *     prevBeginRowIndex (number):
       *         The row index to begin at. This places a limit on the rows
       *         searched.
       *
       * Returns:
       *     number:
       *     The row index where the comment block was placed.
       */
      _placeCommentBlockView(commentBlockView, prevBeginRowIndex) {
        const commentBlock = commentBlockView.model;
        const rowEls = this._selector.getRowsForRange(commentBlock.get('beginLineNum'), commentBlock.get('endLineNum'), prevBeginRowIndex);
        if (rowEls !== null) {
          const beginRowEl = rowEls[0];
          const endRowEl = rowEls[1];

          /*
           * Note that endRow might be null if it exists in a collapsed
           * region, so we can get away with just using beginRow if we
           * need to.
           */
          commentBlockView.setRows($(beginRowEl), $(endRowEl || beginRowEl));
          commentBlockView.$el.appendTo(commentBlockView.$beginRow[0].cells[0]);
          this.#visibleCommentBlockViews.push(commentBlockView);
          return beginRowEl.rowIndex;
        } else {
          this.#hiddenCommentBlockViews.push(commentBlockView);
          return prevBeginRowIndex;
        }
      }

      /**
       * Place any hidden comment blocks onto the diff viewer.
       */
      _placeHiddenCommentBlockViews() {
        const hiddenCommentBlockViews = this.#hiddenCommentBlockViews;
        this.#hiddenCommentBlockViews = [];
        let prevBeginRowIndex;
        for (let i = 0; i < hiddenCommentBlockViews.length; i++) {
          prevBeginRowIndex = this._placeCommentBlockView(hiddenCommentBlockViews[i], prevBeginRowIndex);
        }
      }

      /**
       * Mark any comment block views not visible as hidden.
       */
      _hideRemovedCommentBlockViews() {
        const visibleCommentBlockViews = this.#visibleCommentBlockViews;
        this.#visibleCommentBlockViews = [];
        for (let i = 0; i < visibleCommentBlockViews.length; i++) {
          const commentBlockView = visibleCommentBlockViews[i];
          if (commentBlockView.$el.is(':visible')) {
            this.#visibleCommentBlockViews.push(commentBlockView);
          } else {
            this.#hiddenCommentBlockViews.push(commentBlockView);
          }
        }

        /* Sort these by line number so we can efficiently place them later. */
        _.sortBy(this.#hiddenCommentBlockViews, commentBlockView => commentBlockView.model.get('beginLineNum'));
      }

      /**
       * Update the positions of the collapse buttons.
       *
       * This will attempt to position the collapse buttons such that they're
       * in the center of the exposed part of the expanded chunk in the current
       * viewport.
       *
       * As the user scrolls, they'll be able to see the button scroll along
       * with them. It will not, however, leave the confines of the expanded
       * chunk.
       */
      _updateCollapseButtonPos() {
        this._centered.updatePosition();
      }

      /**
       * Expands or collapses a chunk in a diff.
       *
       * This is called internally when an expand or collapse button is pressed
       * for a chunk. It will fetch the diff and render it, displaying any
       * contained comments, and setting up the resulting expand or collapse
       * buttons.
       *
       * Args:
       *     $btn (jQuery):
       *         The expand/collapse button that was clicked.
       *
       *     expanding (boolean):
       *          Whether or not we are expanding.
       */
      async _expandOrCollapse($btn, expanding) {
        const chunkIndex = $btn.data('chunk-index');
        const linesOfContext = $btn.data('lines-of-context');
        const html = await this.model.getRenderedDiffFragment({
          chunkIndex: chunkIndex,
          linesOfContext: linesOfContext
        });
        const $tbody = $btn.closest('tbody');
        let tbodyID;
        let $scrollAnchor;
        let scrollAnchorID;

        /*
         * We want to position the new chunk or collapse button at
         * roughly the same position as the chunk or collapse button
         * that the user pressed. Figure out what it is exactly and what
         * the scroll offsets are so we can later reposition the scroll
         * offset.
         */
        if (expanding) {
          $scrollAnchor = this.$el;
          scrollAnchorID = $scrollAnchor[0].id;
          if (linesOfContext === 0) {
            /*
             * We've expanded the entire chunk, so we'll be looking
             * for the collapse button.
             */
            tbodyID = /collapsed-(.*)/.exec(scrollAnchorID)[1];
          } else {
            tbodyID = scrollAnchorID;
          }
        } else {
          $scrollAnchor = $btn;
        }
        const scrollOffsetTop = $scrollAnchor.offset().top - this.#$window.scrollTop();

        /*
         * If we already expanded, we may have one or two loaded chunks
         * adjacent to the header. We want to remove those, since we'll
         * be generating new ones that include that data.
         */
        $tbody.prev('.diff-header, .loaded').remove();
        $tbody.next('.diff-header, .loaded').remove();

        /*
         * Replace the header with the new HTML. This may also include a
         * new header.
         */
        $tbody.replaceWith(html);
        if (expanding) {
          this._placeHiddenCommentBlockViews();
        } else {
          this._hideRemovedCommentBlockViews();
        }

        /*
         * Get the new tbody for the header, if any, and try to center.
         */
        if (tbodyID !== undefined) {
          const newEl = document.getElementById(tbodyID);
          if (newEl !== null) {
            $scrollAnchor = $(newEl);
            this.#$window.scrollTop($scrollAnchor.offset().top - scrollOffsetTop);
          }
        }

        /* Recompute the set of buttons for later use. */
        this._centered.setElements(new Map(Array.prototype.map.call(this.$('.rb-c-diff-collapse-button'), el => {
          const $tbody = $(el).closest('tbody');
          const $prev = $tbody.prev();
          const $next = $tbody.next();
          return [el, {
            $parent: $tbody,
            /*
             * Try to map the previous equals block, if available.
             */
            $top: $prev.length === 1 && $prev.hasClass('equal') ? $prev : $tbody,
            /* And now the next one. */
            $bottom: $next.length === 1 && $next.hasClass('equal') ? $next : $tbody
          }];
        })));
        this._updateCollapseButtonPos();

        /*
         * We'll need to update the column sizes, but first, we need
         * to re-calculate things like the line widths, since they
         * may be longer after expanding.
         */
        this._precalculateContentWidths();
        this._updateColumnSizes();
        this.trigger('chunkExpansionChanged');
      }

      /**
       * Pre-calculate the widths and other state needed for column widths.
       *
       * This will store the number of columns and the reserved space that
       * needs to be subtracted from the container width, to be used in later
       * calculating the desired widths of the content areas.
       */
      _precalculateContentWidths() {
        let cellPadding = 0;
        if (!this.$el.hasClass('diff-error') && this.#$revisionRow.length > 0) {
          const containerExtents = this.$el.getExtents('p', 'lr');

          /* Calculate the widths and state of the diff columns. */
          let $cells = $(this.#$revisionRow[0].cells);
          cellPadding = $(this.el.querySelector('pre')).parent().addBack().getExtents('p', 'lr');
          this.#colReservedWidths = $cells.eq(0).outerWidth() + cellPadding + containerExtents;
          this.#numColumns = $cells.length;
          if (this.#numColumns === 4) {
            /* There's a left-hand side and a right-hand side. */
            this.#colReservedWidths += $cells.eq(2).outerWidth() + cellPadding;
          }

          /* Calculate the widths and state of the filename columns. */
          $cells = $(this.#$filenameRow[0].cells);
          this.#numFilenameColumns = $cells.length;
          this.#filenameReservedWidths = containerExtents + 2 * this.#numFilenameColumns;
        } else {
          this.#colReservedWidths = 0;
          this.#filenameReservedWidths = 0;
          this.#numColumns = 0;
          this.#numFilenameColumns = 0;
        }
      }

      /*
       * Update the sizes of the diff content columns.
       *
       * This will figure out the minimum and maximum widths of the columns
       * and set them in a stylesheet, ensuring that lines will constrain to
       * those sizes (force-wrapping if necessary) without overflowing or
       * causing the other column to shrink too small.
       */
      _updateColumnSizes() {
        if (this.$el.hasClass('diff-error')) {
          return;
        }
        let $parent = this.#$parent;
        if (!$parent.is(':visible')) {
          /*
           * We're still in diff loading mode, and the parent is hidden. We
           * can get the width we need from the parent. It should be the
           * same, or at least close enough for the first stab at column
           * sizes.
           */
          $parent = $parent.parent();
        }
        const fullWidth = $parent.width();
        if (fullWidth === this.#prevFullWidth) {
          return;
        }
        this.#prevFullWidth = fullWidth;

        /* Calculate the desired widths of the diff columns. */
        let contentWidth = fullWidth - this.#colReservedWidths;
        if (this.#numColumns === 4) {
          contentWidth /= 2;
        }

        /* Calculate the desired widths of the filename columns. */
        let filenameWidth = fullWidth - this.#filenameReservedWidths;
        if (this.#numFilenameColumns === 2) {
          filenameWidth /= 2;
        }
        this.$el.width(fullWidth);

        /* Update the minimum and maximum widths, if they've changed. */
        if (filenameWidth !== this.#prevFilenameWidth) {
          this.#$filenameRow.children('th').css({
            'max-width': Math.ceil(filenameWidth),
            'min-width': Math.ceil(filenameWidth * 0.66)
          });
          this.#prevFilenameWidth = filenameWidth;
        }
        if (contentWidth !== this.#prevContentWidth) {
          this.#$revisionRow.children('.revision-col').css({
            'max-width': Math.ceil(contentWidth),
            'min-width': Math.ceil(contentWidth * 0.66)
          });
          this.#prevContentWidth = contentWidth;
        }
      }

      /**
       * Handle a window resize.
       *
       * This will update the sizes of the diff columns, and the location of the
       * collapse buttons (if one or more are visible).
       */
      updateLayout() {
        this._updateColumnSizes();
        this._updateCollapseButtonPos();
      }

      /**
       * Handle a file download link being clicked.
       *
       * Prevents the event from bubbling up and being caught by
       * _onFileHeaderClicked.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``click`` event that triggered this handler.
       */
      _onDownloadLinkClicked(e) {
        e.stopPropagation();
      }

      /**
       * Handle the file header being clicked.
       *
       * This will highlight the file header.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``click`` event that triggered this handler.
       */
      _onFileHeaderClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger('fileClicked');
      }

      /**
       * Handle a "Moved to/from" flag being clicked.
       *
       * This will scroll to the location on the other end of the move,
       * and briefly highlight the line.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``click`` event that triggered this handler.
       */
      _onMovedLineClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger('moveFlagClicked', $(e.target).data('line'));
      }

      /**
       * Handle a mouse up event.
       *
       * This will select any chunk that was clicked, highlight the chunk,
       * and ensure it's cleanly scrolled into view.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``mouseup`` event that triggered this handler.
       */
      _onMouseUp(e) {
        const node = e.target;

        /*
         * The user clicked somewhere else. Move the anchor point here
         * if it's part of the diff.
         */
        const $tbody = $(node).closest('tbody');
        if ($tbody.length > 0 && ($tbody.hasClass('delete') || $tbody.hasClass('insert') || $tbody.hasClass('replace'))) {
          const anchor = $tbody[0].querySelector('a');
          if (anchor) {
            this.trigger('chunkClicked', anchor.name);
          }
        }
      }

      /**
       * Handle an expand chunk button being clicked.
       *
       * The expand buttons will expand a collapsed chunk, either entirely
       * or by certain amounts. It will fetch the new chunk contents and
       * inject it into the diff viewer.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``click`` event that triggered this handler.
       */
      _onExpandChunkClicked(e) {
        e.preventDefault();
        this._expandOrCollapse($(e.currentTarget), true);
      }

      /**
       * Handle a collapse chunk button being clicked.
       *
       * The fully collapsed representation of that chunk will be fetched
       * and put into the diff viewer in place of the expanded chunk.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``click`` event that triggered this handler.
       */
      _onCollapseChunkClicked(e) {
        e.preventDefault();
        this._expandOrCollapse($(e.currentTarget), false);
      }

      /**
       * Handler for when show content is clicked.
       *
       * This requeues the corresponding diff to show its deleted content.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``click`` event that triggered this handler.
       */
      _onShowDeletedClicked(e) {
        e.preventDefault();
        e.stopPropagation();

        /*
         * Replace the current contents ("This file was deleted ... ") with a
         * spinner. This will be automatically replaced with the file contents
         * once loaded from the server.
         */
        $(e.target).parent().html('<span class="djblets-o-spinner"></span>');
        this.trigger('showDeletedClicked');
      }

      /**
       * Handler for the suspicious characters toggle button.
       *
       * This will toggle the ``-hide-ducs`` CSS class on the main element, and
       * toggle the show/hide text on the button that triggered this handler.
       *
       * Args:
       *     e (jQuery.Event):
       *         The ``click`` event that triggered this handler.
       */
      _onToggleUnicodeCharsClicked(e) {
        const $el = this.$el;
        const $button = $(e.target);
        const ducsShown = !$el.hasClass('-hide-ducs');
        if (ducsShown) {
          $el.addClass('-hide-ducs');
          $button.text($button.data('show-chars-label'));
        } else {
          $el.removeClass('-hide-ducs');
          $button.text($button.data('hide-chars-label'));
        }
      }
    }) || _class$a;

    var _dec$3, _class$9;

    /**
     * Options for the FileAttachmentThumbnailView.
     *
     * Version Changed:
     *     7.0.2:
     *     Added ``reviewRequestEditorView``.
     *
     * Version Added:
     *     6.0
     */

    /**
     * Displays a thumbnail depicting a file attachment.
     *
     * There are two ways that Review Board currently renders file attachments.
     * One is on page load (as part of the initial page template), and the other
     * is dynamically (when uploading vs Drag and Drop or manual upload).
     *
     * Depending on the method, we either already have elements to work with,
     * or we don't. In the latter case, it's currently up to the caller to
     * tell us, using the renderThumbnail option.
     *
     * File attachments that aren't already on the page that are currently loading
     * will be displayed as a blank file attachment (no identifying information)
     * with a spinner. When loaded, it will appear as a standard file attachment.
     *
     * The following signals are provided, on top of the standard Backbone.View
     * signals:
     *
     *     * beginEdit
     *       - Editing of the file attachment (caption) has begun.
     *
     *     * endEdit
     *       - Editing of the file attachment (caption) has finished.
     *
     *     * commentSaved
     *       - A draft comment on the file has been saved.
     *         (Only for file attachments without a Review UI.)
     *
     * Version Changed:
     *     6.0:
     *     Deprecated the ``FileAttachmentThumbnail`` name for this view and
     *     renamed to ``FileAttachmentThumbnailView``.
     */
    let FileAttachmentThumbnailView = (_dec$3 = spina.spina({
      prototypeAttrs: ['actionsTemplate', 'states', 'template', 'thumbnailContainerTemplate']
    }), _dec$3(_class$9 = class FileAttachmentThumbnailView extends spina.BaseView {
      static className = 'file-container';
      static events = {
        'click .file-add-comment a': '_onAddCommentClicked',
        'click .file-delete': '_onDeleteClicked',
        'click .file-undo-delete': '_onUndoDeleteClicked',
        'click .file-update a': '_onUpdateClicked',
        'mouseenter': '_onHoverIn',
        'mouseleave': '_onHoverOut'
      };
      static template = _.template(`<div class="file">
 <div class="file-actions-container">
  <ul class="file-actions"></ul>
 </div>
 <div class="file-state-container"></div>
 <div class="file-thumbnail-container"></div>
 <div class="file-caption-container">
  <div class="file-caption can-edit">
   <a href="<%- downloadURL %>" class="<%- captionClass %>">
    <%- caption %>
   </a>
  </div>
 </div>
</div>`);
      static actionsTemplate = _.template(`<% if (loaded) { %>
<%  if (canReview) { %>
<%   if (canAccessReviewUI) { %>
<li>
 <a class="file-review" role="button" href="<%- reviewURL %>">
  <span class="fa fa-comment-o" aria-hidden="true"></span>
  <%- reviewText %>
 </a>
</li>
<%   } else { %>
<li class="file-add-comment">
 <a role="button" href="#">
  <span class="fa fa-comment-o" aria-hidden="true"></span>
  <%- commentText %>
 </a>
</li>
<%   } %>
<%  } %>
<li>
 <a class="file-download" role="button" href="<%- downloadURL %>">
  <span class="fa fa-download" aria-hidden="true"></span>
  <%- downloadText %>
 </a>
</li>
<%  if (canUndoDeletion) { %>
    <li class="file-undo-delete">
     <a role="button" href="#">
      <span class="fa fa-undo" aria-hidden="true"></span>
      <%- undoDeleteText %>
     </a>
    </li>
<%  } else if (canEdit) { %>
<%   if (attachmentHistoryID) { %>
<li class="file-update">
 <a role="button" href="#"
    data-attachment-history-id="<%- attachmentHistoryID %>">
  <span class="fa fa-upload" aria-hidden="true"></span>
  <%- updateText %>
 </a>
</li>
<%   } %>
<li class="file-delete">
 <a role="button" href="#">
  <span class="fa fa-trash-o" aria-hidden="true"></span>
  <%- deleteText %>
 </a>
</li>
<%  } %>
<% } %>`);
      static thumbnailContainerTemplate = _.template(`<% if (!loaded) { %>
<span class="djblets-o-spinner"></span>
<% } else { %>
<%     if (canAccessReviewUI) { %>
<a href="<%- reviewURL %>" class="file-thumbnail-overlay"></a>
<%     } %>
<%=  thumbnailHTML %>
<% } %>`);
      /** The possible states for the file attachment. */
      static states = RB.FileAttachmentStates;

      /**********************
       * Instance variables *
       **********************/

      /** The view options. */

      /**
       * The file actions.
       *
       * This is only public so that it can be accessed in unit tests.
       */

      /**
       * The view for editing the caption.
       *
       * This is only public so that it can be accessed in unit tests.
       */

      /** The file actions container. */
      #$actionsContainer;

      /** The caption. */
      #$caption;

      /** The caption container. */
      #$captionContainer;

      /** The element representing the whole file attachment. */
      #$file;

      /** The container for the state label. */
      #$stateContainer;

      /** The thumbnail container. */
      #$thumbnailContainer;

      /**
       * Whether the user can currently edit the file attachment.
       *
       * This differs from options.canEdit because this may change depending
       * on the file attachment state.
       */
      #canCurrentlyEdit;

      /** The processed comments that are usable in the comment dialog. */
      #comments = [];

      /** Whether the comments have been processed. */
      #commentsProcessed = null;

      /** The current draft comment for the file attachment. */
      #draftComment = null;

      /** Whether the thumbnail supports scrolling. */
      #scrollingThumbnail = null;

      /** The view for the state label. */
      #stateLabelView;

      /** Whether the thumbnail is currently playing a video. */
      #playingVideo = null;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (FileAttachmentThumbnailViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.options = options;
        this.#canCurrentlyEdit = this.model.get('state') !== this.states.PENDING_DELETION && options.canEdit;
      }

      /**
       * Render the file attachment, and hooks up all events.
       *
       * If the renderThumbnail option was provided when constructing the view,
       * this will render the thumbnail from scratch, and then dynamically
       * update it as it loads. It will start off displaying with a spinner,
       * if not yet loaded.
       *
       * In either case, this will set up the caption editor and other signals
       * to control the lifetime of the thumbnail.
       */
      onInitialRender() {
        /*
         * Until FileAttachmentThumbnailView is the only thing rendering
         * thumbnails, we'll be in a situation where we may either be working
         * with an existing DOM element (for existing file attachments), or a
         * new one (for newly uploaded file attachments). In the latter case,
         * we'll want to render our own thumbnail.
         */
        if (this.options.renderThumbnail) {
          this._renderContents();
        }
        this.#$captionContainer = this.$('.file-caption');
        this.#$caption = this.#$captionContainer.find('a.edit');
        this.listenTo(this.model, 'destroy', () => {
          this.$el.fadeOut(() => this.remove());
        });
        this.listenTo(this.model, 'change:caption', this._onCaptionChanged);
        this._onCaptionChanged();
        if (this.options.renderThumbnail) {
          this.#$actionsContainer = this.$('.file-actions-container');
          this._$actions = this.#$actionsContainer.children('.file-actions');
          this.#$captionContainer = this.$('.file-caption-container');
          this.#$thumbnailContainer = this.$('.file-thumbnail-container');
          this.#$stateContainer = this.$('.file-state-container');
          this.#$file = this.$('.file');
          this._$actions.find('.file-download').bindProperty('href', this.model, 'downloadURL', {
            elementToModel: false
          });
          this.#$caption.bindProperty('href', this.model, 'downloadURL', {
            elementToModel: false
          });
          this.listenTo(this.model, 'change:loaded', this._onLoadedChanged);
          this._onLoadedChanged();
          this.listenTo(this.model, 'change:thumbnailHTML', this._renderThumbnail);
          this._renderThumbnail();
          this.listenTo(this.model, 'change:state', this._onStateChanged);
          this._renderStateLabel();
        }
        this._renderCaptionEditor();
        if (!this.options.renderThumbnail) {
          /*
           * Add any hooks. If renderThumbnail is true then the hooks will
           * have already been added.
          */
          RB.FileAttachmentThumbnailContainerHook.each(hook => {
            const HookViewType = hook.get('viewType');
            const hookView = new HookViewType({
              el: this.el,
              extension: hook.get('extension'),
              fileAttachment: this.model,
              thumbnailView: this
            });
            hookView.render();
          });
        }
      }

      /**
       * Fade the view in.
       */
      fadeIn() {
        this.$el.css('opacity', 0).fadeTo(1000, 1);
      }

      /**
       * Add a new action to the actions menu.
       *
       * Args:
       *     appendToClass (str):
       *         The class of an existing action item for which the new
       *         action item will follow. In the actions menu list, the
       *         new action will appear as the next item after this action.
       *
       *     itemClass (str):
       *         The class of the new action, to set on the list element
       *         that wraps the action. If an action of this class already
       *         exists, it will be removed and replaced by this new action.
       *
       *     itemHTML (str):
       *         The HTML of the new action item.
       *
       * Returns:
       *     jQuery:
       *     The element of the new action item.
       */
      addAction(appendToClass, itemClass, itemHTML) {
        this._$actions.find(`.${itemClass}`).remove();
        const itemTemplate = _.template(`<li class="<%= itemClass %>">
 <%=  itemHTML %>
</li>`);
        const $appendItem = this._$actions.find(`.${appendToClass}`).closest('li');
        const $action = $(itemTemplate({
          itemClass: itemClass,
          itemHTML: itemHTML
        }));
        $appendItem.after($action);
        return $action;
      }

      /**
       * Show the comment dialog for the file attachment.
       *
       * This is only ever used if the file attachment does not have a
       * Review UI for it. A single comment dialog will appear, allowing
       * comments on the file as a whole.
       */
      showCommentDlg() {
        console.assert(!this.model.get('canAccessReviewUI'), 'showCommentDlg can only be called if the file ' + 'attachment does not have a review UI');
        this._processComments();
        this._createDraftComment();
        CommentDialogView.create({
          comment: this.#draftComment,
          position: {
            beside: {
              el: this.$el,
              fitOnScreen: true,
              side: 'br'
            }
          },
          publishedComments: this.#comments,
          publishedCommentsType: 'file_attachment_comments'
        });
      }

      /**
       * Process all comments provided when constructing the view.
       *
       * The comments will be made usable by the comment dialog.
       *
       * This is only used if the file attachment does not have a Review UI.
       */
      _processComments() {
        if (this.#commentsProcessed) {
          return;
        }
        const comments = this.options.comments || [];
        comments.forEach(comment => {
          if (comment.localdraft) {
            this._createDraftComment(comment.comment_id, comment.text);
          } else {
            this.#comments.push(comment);
          }
        });
        this.#commentsProcessed = true;
      }

      /**
       * Create a new draft comment with the given ID and text.
       *
       * Only one draft comment can be created at a time.
       *
       * This is only used if the file attachment does not have a Review UI.
       *
       * Args:
       *     commentID (number):
       *         The ID of the draft comment.
       *
       *     text (string):
       *         The comment text.
       */
      _createDraftComment(commentID, text) {
        if (this.#draftComment !== null) {
          return;
        }
        const review = this.options.reviewRequest.createReview();
        this.#draftComment = review.createFileAttachmentComment(commentID, this.model.id);
        if (text) {
          this.#draftComment.set('text', text);
        }
        this.listenTo(this.#draftComment, 'saved', () => this.trigger('commentSaved', this.#draftComment));
      }

      /**
       * Save the given caption value.
       *
       * Version Added:
       *     6.0
       */
      async _saveCaption(val) {
        const model = this.model;

        /*
         * We want to set the caption after ready() finishes, in case
         * it loads state and overwrites.
         */
        await model.ready();
        model.set('caption', val);
        this.trigger('endEdit');
        await model.save({
          attrs: ['caption']
        });
      }

      /**
       * Render the caption editor and set up its event listeners.
       *
       * Version Added:
       *     6.0
       */
      _renderCaptionEditor() {
        if (this.#canCurrentlyEdit === false && this._captionEditorView) {
          /*
           * The view exists but we're not allowed to edit anymore.
           * Remove it.
           */
          this._captionEditorView.remove();
          return;
        } else if (this.#canCurrentlyEdit && this._captionEditorView) {
          /* The view already exists. No op. */
          return;
        } else if (this.#canCurrentlyEdit === false) {
          /* The view doesn't and shouldn't exist. No op. */
          return;
        }
        this._captionEditorView = new RB.InlineEditorView({
          editIconClass: 'rb-icon rb-icon-edit',
          el: this.#$caption,
          showButtons: true
        });
        this._captionEditorView.render();
        this._captionEditorView.el.addEventListener('startEdit', e => {
          const reviewRequestEditor = this.options.reviewRequestEditor;
          if (reviewRequestEditor.hasUnviewedUserDraft) {
            e.preventDefault();
            this.options.reviewRequestEditorView.promptToLoadUserDraft();
          }
          this.#$actionsContainer.hide();
        });
        this.listenTo(this._captionEditorView, 'beginEditPreShow', () => {
          this.$el.addClass('editing');
          this._stopAnimating();
        });
        this.listenTo(this._captionEditorView, 'beginEdit', () => {
          if (this.#$caption.hasClass('empty-caption')) {
            this._captionEditorView.$field.val('');
          }
          this.trigger('beginEdit');
        });
        this.listenTo(this._captionEditorView, 'cancel', () => {
          this.$el.removeClass('editing');
          this.trigger('endEdit');
        });
        this.listenTo(this._captionEditorView, 'complete', async val => {
          this.$el.removeClass('editing');
          await this._saveCaption(val);
        });
      }

      /**
       * Render the contents of this view's element.
       *
       * This is only done when requested by the caller.
       */
      _renderContents() {
        const model = this.model;
        const caption = model.get('caption');
        const captionText = caption ? caption : gettext("No caption");
        const captionClass = caption ? 'edit' : 'edit empty-caption';
        this.$el.html(this.template(_.defaults({
          caption: captionText,
          captionClass: captionClass
        }, model.attributes))).addClass(this.className);
      }

      /**
       * Render the thumbnail for the file attachment.
       */
      _renderThumbnail() {
        const model = this.model;
        let reviewURL = model.get('reviewURL');
        if (reviewURL && this.options.reviewRequestEditor.get('viewingUserDraft')) {
          reviewURL += '?view-draft=1';
        }
        this.#$thumbnailContainer.html(this.thumbnailContainerTemplate(_.defaults({
          reviewURL
        }, model.attributes)));

        // Disable tabbing to any <a> elements inside the thumbnail.
        this.#$thumbnailContainer.find('a').each((i, el) => {
          el.tabIndex = -1;
        });
      }

      /**
       * Render the state label for the file attachment.
       *
       * Version Added:
       *     6.0
       */
      _renderStateLabel() {
        if (this.#stateLabelView) {
          this.#stateLabelView.remove();
        }
        if (!this.options.canEdit) {
          return;
        }
        const state = this.model.get('state');
        if (state === this.states.PUBLISHED || state === this.states.DELETED) {
          /* Don't display state labels for these types of attachments. */
          return;
        }
        const theme = state === this.states.PENDING_DELETION ? RB.FieldStateLabelThemes.DELETED : RB.FieldStateLabelThemes.DRAFT;
        this.#stateLabelView = new RB.FieldStateLabelView({
          state: this._getStateText(state),
          theme: theme
        });
        this.#stateLabelView.renderInto(this.#$stateContainer);
      }

      /**
       * Handler for when the model's 'state' property changes.
       *
       * Args:
       *     model (FileAttachment):
       *         The file attachment model.
       *
       *     state (string):
       *         The new state value.
       */
      _onStateChanged(model, state) {
        if (state === this.states.PENDING_DELETION) {
          /* Block editing for attachments that are pending deletion. */
          this.#canCurrentlyEdit = false;
        } else if (this.#canCurrentlyEdit !== this.options.canEdit) {
          /* We're not pending deletion, set this back to canEdit. */
          this.#canCurrentlyEdit = this.options.canEdit;
        }
        this._renderStateLabel();
        this._onLoadedChanged();
        this._renderCaptionEditor();
      }

      /**
       * Handler for when the model's 'loaded' property changes.
       *
       * Depending on if the file attachment is now loaded, either a
       * blank spinner thumbnail will be shown, or a full thumbnail.
       */
      _onLoadedChanged() {
        const model = this.model;
        const state = model.get('state');
        const useDraftDelete = state === this.states.NEW || state === this.states.NEW_REVISION || state === this.states.DRAFT;
        const deleteText = useDraftDelete ? gettext("Delete Draft") : gettext("Delete");
        this._$actions.html(this.actionsTemplate(_.defaults({
          canEdit: this.options.canEdit,
          canReview: state !== this.states.DELETED,
          canUndoDeletion: state === this.states.PENDING_DELETION && this.options.canEdit,
          commentText: gettext("Comment"),
          deleteText: deleteText,
          downloadText: gettext("Download"),
          reviewText: gettext("Review"),
          undoDeleteText: gettext("Undo Delete"),
          updateText: gettext("Update")
        }, model.attributes)));

        /*
        * Some hooks may depend on the elements being added above, so
        * render the hooks here too.
        */
        RB.FileAttachmentThumbnailContainerHook.each(hook => {
          const HookViewType = hook.get('viewType');
          const hookView = new HookViewType({
            el: this.el,
            extension: hook.get('extension'),
            fileAttachment: model,
            thumbnailView: this
          });
          hookView.render();
        });
      }

      /**
       * Handler for when the model's caption changes.
       *
       * If a caption is set, the thumbnail will display it. Otherwise,
       * it will display "No caption".
       */
      _onCaptionChanged() {
        const model = this.model;
        const state = model.get('state');
        const caption = model.get('caption');
        const publishedCaption = model.get('publishedCaption');
        const captionHasChanged = caption !== publishedCaption;
        if (caption) {
          this.#$caption.text(caption).removeClass('empty-caption');
        } else {
          this.#$caption.text(gettext("No caption")).addClass('empty-caption');
        }
        if (state === this.states.DRAFT && !captionHasChanged) {
          /*
           * This is a draft but the caption has changed back to the
           * published version. Remove the draft state.
           */
          model.set('state', this.states.PUBLISHED);
        } else if (state === this.states.PUBLISHED && captionHasChanged) {
          /* The caption changed, put this into draft state. */
          model.set('state', this.states.DRAFT);
        }
      }

      /**
       * Handler for the New Comment button.
       *
       * Shows the comment dialog.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event that triggered the action.
       */
      _onAddCommentClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        this.showCommentDlg();
      }

      /**
       * Handler for the Update button.
       *
       * Shows the upload form.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event that triggered the action.
       */
      _onUpdateClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        const reviewRequestEditor = this.options.reviewRequestEditor;
        if (reviewRequestEditor.hasUnviewedUserDraft) {
          this.options.reviewRequestEditorView.promptToLoadUserDraft();
        } else {
          const model = this.model;
          const updateDlg = new RB.UploadAttachmentView({
            attachmentHistoryID: model.get('attachmentHistoryID'),
            presetCaption: model.get('caption'),
            reviewRequestEditor: this.options.reviewRequestEditor
          });
          updateDlg.show();
        }
      }

      /**
       * Handler for the Delete button.
       *
       * Deletes the file attachment from the review request draft.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event that triggered the action.
       */
      async _onDeleteClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        const reviewRequestEditor = this.options.reviewRequestEditor;
        if (reviewRequestEditor.hasUnviewedUserDraft) {
          this.options.reviewRequestEditorView.promptToLoadUserDraft();
        } else {
          const model = this.model;
          const state = model.get('state');
          if (state === this.states.DRAFT) {
            /*
             * "Delete" the draft version of the file attachment by
             * reverting to its published caption.
             */
            await this._saveCaption(model.get('publishedCaption'));
          } else {
            model.destroy();
          }
        }
      }

      /**
       * Handler for the Undo Delete button.
       *
       * Undoes the pending deletion of the file attachment, reverting it
       * to its published state.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event that triggered the action.
       */
      _onUndoDeleteClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        const model = this.model;
        RB.apiCall({
          data: {
            'pending_deletion': false
          },
          error: xhr => {
            const rsp = xhr.responseJSON;
            const caption = model.get('caption');
            if (rsp && rsp.stat) {
              alert(`Failed to undo the deletion of file attachment
"${caption}": ${rsp.err.msg}`);
            } else {
              alert(`Failed to undo the deletion of file attachment
"${caption}": ${xhr.errorText}`);
            }
          },
          method: 'PUT',
          success: () => {
            model.set({
              state: this.states.PUBLISHED
            });
          },
          url: model.url()
        });
      }

      /**
       * Handler for when the mouse hovers over the thumbnail.
       *
       * Determines if we should scroll the thumbnail or not.
       */
      _onHoverIn() {
        const $thumbnail = this.$('.file-thumbnail').children();
        const actionsWidth = this.#$actionsContainer.outerWidth();
        const actionsRight = this.#$file.offset().left + this.#$file.outerWidth() + actionsWidth;
        this.#$actionsContainer.show();
        this.trigger('hoverIn', this.$el);

        /*
         * Position the actions menu to the left or right of the attachment
         * thumbnail.
         */
        if (!this.options.reviewRequestEditorView.inMobileMode) {
          if (actionsRight > $(window).width()) {
            this.#$actionsContainer.css('left', -actionsWidth).addClass('left');
          } else {
            this.#$actionsContainer.css('left', '100%').addClass('right');
          }
        }
        if (!this.$el.hasClass('editing') && $thumbnail.length === 1) {
          const thumbnailEl = $thumbnail[0];
          if (thumbnailEl.tagName === 'VIDEO') {
            /* The thumbnail contains a video, so start playing it. */
            const promise = thumbnailEl.play();
            if (promise === undefined) {
              /* Older browsers don't return Promises. */
              this.#playingVideo = true;
            } else {
              promise.then(() => {
                this.#playingVideo = true;
              }).catch(error => {
                /* Ignore the error. We just won't play it. */
                console.error('Unable to play the video attachment: %s', error);
              });
            }
          } else {
            /* Scroll the container to show all available content. */
            const elHeight = this.$el.height();
            const thumbnailHeight = $thumbnail.height() || 0;
            if (thumbnailHeight > elHeight) {
              const distance = elHeight - thumbnailHeight;
              const duration = Math.abs(distance) / 200 * 1000; // 200 pixels/s

              this.#scrollingThumbnail = true;
              $thumbnail.delay(1000).animate({
                'margin-top': distance + 'px'
              }, {
                duration: duration,
                easing: 'linear'
              }).delay(500).animate({
                'margin-top': 0
              }, {
                complete: () => {
                  this.#scrollingThumbnail = false;
                },
                duration: duration,
                easing: 'linear'
              });
            }
          }
        }
      }

      /**
       * Handler for when the mouse stops hovering over the thumbnail.
       *
       * Removes the classes for the actions container, and stops animating
       * the thumbnail contents.
       */
      _onHoverOut() {
        this.trigger('hoverOut');
        this.#$actionsContainer.removeClass('left').removeClass('right').hide();
        this._stopAnimating();
      }

      /**
       * Stop animating this thumbnail.
       *
       * This is when moving the mouse outside of the thumbnail, or when the
       * caption editor is opened.
       */
      _stopAnimating() {
        if (this.#scrollingThumbnail) {
          this.#scrollingThumbnail = false;
          this.$('.file-thumbnail').children().stop(true).animate({
            'margin-top': 0
          }, {
            duration: 100
          });
        } else if (this.#playingVideo) {
          this.#playingVideo = false;
          this.$('video')[0].pause();
        }
      }

      /**
       * Return a localized text for the file attachment state.
       *
       * Args:
       *     state (string):
       *         The state value.
       *
       * Returns:
       *     string:
       *     The localized and human readable text representing the state.
       */
      _getStateText(state) {
        switch (state) {
          case RB.FileAttachmentStates.DELETED:
            return gettext("Deleted");
          case RB.FileAttachmentStates.DRAFT:
            return gettext("Draft");
          case RB.FileAttachmentStates.NEW:
            return gettext("New");
          case RB.FileAttachmentStates.NEW_REVISION:
            return gettext("New Revision");
          case RB.FileAttachmentStates.PENDING_DELETION:
            return gettext("Pending Deletion");
          case RB.FileAttachmentStates.PUBLISHED:
            return gettext("Published");
          default:
            return '';
        }
      }
    }) || _class$9);

    /**
     * This is a legacy alias for the FileAttachmentThumbnailView.
     *
     * Deprecated:
     *     6.0
     */
    const FileAttachmentThumbnail = FileAttachmentThumbnailView;

    var _dec$2, _class$8, _dec2, _class2$2, _dec3, _class3$1, _dec4, _class4$1, _dec5, _class5$1, _class6$1;

    /**
     * Options for the BannerView.
     *
     * Version Added:
     *     6.0
     */
    /**
     * Base class for review request banners.
     *
     * This will render a banner based on the data provided by subclasses,
     * and handle actions and editing of text fields.
     */
    let BannerView = (_dec$2 = spina.spina({
      prototypeAttrs: ['DescriptionFieldViewType', 'actions', 'describeText', 'descriptionFieldClasses', 'descriptionFieldHTML', 'descriptionFieldID', 'descriptionFieldName', 'showChangesField', 'subtitle', 'template', 'title']
    }), _dec$2(_class$8 = class BannerView extends spina.BaseView {
      static DescriptionFieldViewType = ChangeDescriptionFieldView;
      static actions = [];
      static className = 'banner';
      static describeText = '';
      static descriptionFieldClasses = '';
      static descriptionFieldHTML = '';
      static descriptionFieldID = 'change_description';
      static descriptionFieldName = null;
      static showChangesField = true;
      static subtitle = '';
      static template = _.template(`<h1><%- title %></h1>
<% if (subtitle) { %>
<p><%- subtitle %></p>
<% } %>
<span class="banner-actions">
<% _.each(actions, function(action) { %>
 <button class="ink-c-button" type="button" id="<%= action.id %>">
  <%- action.label %>
 </button>
<% }); %>
<% if (showSendEmail) { %>
 <label>
  <input type="checkbox" class="send-email" checked>
  ${gettext("Send E-Mail")}
</label>
<% } %>
</span>
<% if (showChangesField) { %>
 <p><label for="field_<%- descriptionFieldID %>"><%- describeText %></label></p>
 <pre id="field_<%- descriptionFieldID %>"
      class="field field-text-area <%- descriptionFieldClasses %>"
      data-field-id="field_<%- descriptionFieldID %>"
      ><%= descriptionFieldHTML %></pre>
<% } %>`);
      static title = '';

      /**********************
       * Instance variables *
       **********************/

      /** The change description field editor, if present. */

      /** The review request editor. */

      /** The review request editor view. */

      /** The review request model. */

      /** Whether to show the "Send E-mail" checkbox. */
      showSendEmail = false;

      /** The button elements. */

      /**
       * Initialize the banner.
       *
       * Args:
       *     options (BannerViewOptions):
       *         Options for the banner.
       */
      initialize(options) {
        this.reviewRequestEditorView = options.reviewRequestEditorView;
        this.reviewRequestEditor = this.reviewRequestEditorView.model;
        this.reviewRequest = this.reviewRequestEditor.get('reviewRequest');
        this.$buttons = null;
      }

      /**
       * Render the banner.
       *
       * If there's an existing banner on the page, from the generated
       * template, then this will make use of that template. Otherwise,
       * it will construct a new one.
       */
      onInitialRender() {
        const readOnly = RB.UserSession.instance.get('readOnly');
        if (this.$el.children().length === 0) {
          this.$el.html(this.template({
            actions: readOnly ? [] : this.actions,
            describeText: this.describeText,
            descriptionFieldClasses: this.descriptionFieldClasses,
            descriptionFieldHTML: this.descriptionFieldHTML,
            descriptionFieldID: this.descriptionFieldID,
            showChangesField: this.showChangesField && !readOnly,
            showSendEmail: this.showSendEmail,
            subtitle: this.subtitle,
            title: this.title
          }));
        }
        if (this.DescriptionFieldViewType) {
          this.field = new this.DescriptionFieldViewType({
            el: this.$(`#field_${this.descriptionFieldID}`),
            fieldID: this.descriptionFieldID,
            model: this.reviewRequestEditor
          });
          this.reviewRequestEditorView.addFieldView(this.field);
        }
        this.$buttons = this.$('.ink-c-button');
        this.reviewRequestEditor.on('saving destroying', () => this.$buttons.prop('disabled', true));
        this.reviewRequestEditor.on('saved saveFailed destroyed', () => this.$buttons.prop('disabled', false));
      }
    }) || _class$8);
    /**
     * Base class for a banner representing a closed review request.
     *
     * This provides a button for reopening the review request. It's up
     * to subclasses to provide the other details.
     */
    let ClosedBannerView = (_dec2 = spina.spina({
      prototypeAttrs: ['closeType']
    }), _dec2(_class2$2 = class ClosedBannerView extends BannerView {
      static DescriptionFieldViewType = CloseDescriptionFieldView;
      static actions = [{
        id: 'btn-review-request-reopen',
        label: gettext("Reopen for Review")
      }];
      static closeType = undefined;
      static descriptionFieldID = 'close_description';
      static descriptionFieldName = 'closeDescription';
      static events = {
        'click #btn-review-request-reopen': '_onReopenClicked'
      };

      /**
       * Render the banner.
       */
      onInitialRender() {
        const descriptionFieldClasses = [];
        if (this.reviewRequestEditor.get('statusMutableByUser')) {
          descriptionFieldClasses.push('editable');
        }
        if (this.reviewRequest.get('closeDescriptionRichText')) {
          descriptionFieldClasses.push('rich-text');
        }
        this.descriptionFieldClasses = descriptionFieldClasses.join(' ');
        this.descriptionFieldHTML = this.reviewRequestEditor.get('closeDescriptionRenderedText');
        super.onInitialRender();
        this.field.closeType = this.closeType;
      }

      /**
       * Handle a click on "Reopen for Review".
       *
       * Returns:
       *     boolean:
       *     False, always.
       */
      _onReopenClicked() {
        this.reviewRequest.reopen().catch(err => alert(err.message));
        return false;
      }
    }) || _class2$2);
    /**
     * A banner representing a discarded review request.
     */
    let DiscardedBannerView = (_dec3 = spina.spina({
      prototypeAttrs: ['id']
    }), _dec3(_class3$1 = class DiscardedBannerView extends ClosedBannerView {
      static closeType = RB.ReviewRequest.CLOSE_DISCARDED;
      static describeText = gettext("Describe the reason it's discarded (optional):");
      static id = 'discard-banner';
      static title = gettext("This change has been discarded.");
    }) || _class3$1);
    /**
     * A banner representing a submitted review request.
     */
    let CompletedBannerView = (_dec4 = spina.spina({
      prototypeAttrs: ['id']
    }), _dec4(_class4$1 = class CompletedBannerView extends ClosedBannerView {
      static closeType = RB.ReviewRequest.CLOSE_SUBMITTED;
      static describeText = gettext("Describe the completed change (optional):");
      static id = 'submitted-banner';
      static title = gettext("This change has been marked as completed.");
    }) || _class4$1);
    /**
     * A banner representing a draft of a review request.
     *
     * Depending on the public state of the review request, this will
     * show different text and a different set of buttons.
     */
    let DraftBannerView = (_dec5 = spina.spina({
      prototypeAttrs: ['id', '_newDraftTemplate']
    }), _dec5(_class5$1 = class DraftBannerView extends BannerView {
      static describeText = gettext("Describe your changes (optional):");
      static descriptionFieldID = 'change_description';
      static descriptionFieldName = 'changeDescription';
      static events = {
        'click #btn-draft-discard': '_onDiscardDraftClicked',
        'click #btn-draft-publish': '_onPublishDraftClicked',
        'click #btn-review-request-discard': '_onCloseDiscardedClicked'
      };
      static id = 'draft-banner';
      static subtitle = gettext("Be sure to publish when finished.");
      static title = gettext("This review request is a draft.");
      static _newDraftTemplate = _.template(`<div class="interdiff-link">
 <%- newDiffText %>
 <a href="<%- interdiffLink %>"><%- showChangesText %></a>
</div>`);

      /**
       * Initialize the banner.
       *
       * Args:
       *     options (BannerViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        super.initialize(options);
        if (this.reviewRequest.get('public')) {
          this.showSendEmail = this.reviewRequestEditor.get('showSendEmail');
          this.title = gettext("This review request is a draft.");
          this.actions = [{
            id: 'btn-draft-publish',
            label: gettext("Publish Changes")
          }, {
            id: 'btn-draft-discard',
            label: gettext("Discard Draft")
          }];
        } else {
          this.showChangesField = false;
          this.actions = [{
            id: 'btn-draft-publish',
            label: gettext("Publish")
          }, {
            id: 'btn-review-request-discard',
            label: gettext("Discard Review Request")
          }];
        }
      }

      /**
       * Handle a click on "Publish Changes".
       *
       * Begins publishing the review request. If there are any field editors
       * still open, they'll be saved first.
       *
       * Returns:
       *     boolean:
       *     False, always.
       */
      async _onPublishDraftClicked() {
        const $sendEmail = this.$('.send-email');
        await this.reviewRequestEditorView.publishDraft({
          trivial: $sendEmail.length === 1 && !$sendEmail.is(':checked')
        });
        return false;
      }

      /**
       * Handle a click on "Discard Draft".
       *
       * Discards the draft of the review request.
       *
       * Args:
       *     e (Event):
       *         The event which triggered the action.
       */
      async _onDiscardDraftClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
          await this.reviewRequest.draft.destroy();
        } catch (err) {
          alert(err.message);
        }
      }

      /**
       * Handle a click on "Discard Review Request".
       *
       * Returns:
       *     boolean:
       *     False, always.
       */
      _onCloseDiscardedClicked() {
        this.reviewRequest.close({
          type: RB.ReviewRequest.CLOSE_DISCARDED
        }).catch(err => alert(err.message));
        return false;
      }

      /**
       * Render the banner.
       */
      onInitialRender() {
        const descriptionFieldClasses = [];
        if (this.reviewRequestEditor.get('mutableByUser')) {
          descriptionFieldClasses.push('editable');
        }
        const draft = this.reviewRequest.draft;
        if (draft.get('changeDescriptionRichText')) {
          descriptionFieldClasses.push('rich-text');
        }
        this.descriptionFieldClasses = descriptionFieldClasses.join(' ');
        this.descriptionFieldHTML = this.reviewRequestEditor.get('changeDescriptionRenderedText');
        super.onInitialRender();
        const interdiffLink = draft.get('interdiffLink');
        if (interdiffLink) {
          this.$el.append(this._newDraftTemplate({
            interdiffLink: interdiffLink,
            newDiffText: gettext("This draft adds a new diff."),
            showChangesText: gettext("Show changes")
          }));
        }
      }
    }) || _class5$1);
    /**
     * Options for the ReviewRequestEditorView.
     *
     * Version Added:
     *     7.0.3
     */
    /**
     * Manages the user-visible state of an editable review request.
     *
     * This owns the fields, thumbnails, banners, and general interaction
     * around editing a review request.
     */
    let ReviewRequestEditorView = spina.spina(_class6$1 = class ReviewRequestEditorView extends spina.BaseView {
      /**********************
       * Instance variables *
       **********************/

      /**
       * Whether the page that the editor is on is in mobile mode.
       *
       * Version Added:
       *     7.0.3
       */
      inMobileMode = null;

      /**
       * The view options.
       *
       * Version Added:
       *     7.0.3
       */

      /** The element containing the file attachment thumbnails. */
      #$attachments = null;

      /** The parent of the file attachments element. */
      #$attachmentsContainer = null;

      /** The container where banners are added. */
      #$bannersContainer = null;

      /** The main fields of the review request. */
      #$main = null;

      /** The extra fields of the review request. */
      #$extra = null;

      /** The warning message box. */
      #$warning = null;

      /** A mapping from field ID to field view instance. */
      #fieldViews = {};

      /** The views for all of the file attachment thumbnails. */
      #fileAttachmentThumbnailViews = [];

      /** The views for all of the review reply editors. */
      #reviewReplyEditorViews = [];

      /**
       * The active banner, if available.
       *
       * This can be either a close banner or the legacy draft banner. The
       * unified review banner is separate and manages its own lifecycle.
       */
      banner = null;

      /** The review request draft. */

      /**
       * Initialize the view.
       */
      initialize(options) {
        this.options = options;
        this.inMobileMode = options.inMobileMode;
        this.draft = this.model.get('reviewRequest').draft;
      }

      /**
       * Add a view for a field in the review request.
       *
       * Args:
       *     view (BaseFieldView):
       *         The view which handles editing for the field.
       */
      addFieldView(view) {
        this.#fieldViews[view.fieldID] = view;
        view.reviewRequestEditorView = this;
        this.listenTo(view, 'fieldError', err => {
          this.#$warning.text(err).show().delay(6000).fadeOut(400, () => this.#$warning.hide());
        });
        this.listenTo(view, 'fieldSaved', this.showBanner);
        if (this.rendered) {
          view.render();
        }
      }

      /**
       * Return the view for the field with the given ID.
       *
       * Args:
       *     fieldID (string):
       *        The ID of the field.
       *
       * Returns:
       *     BaseFieldView:
       *     The view which handles editing for the field.
       */
      getFieldView(fieldID) {
        return this.#fieldViews[fieldID];
      }

      /**
       * Render the editor.
       *
       * This will import all pre-rendered file attachment and screenshot
       * thumbnails, turning them into FileAttachment and Screenshot objects.
       */
      onInitialRender() {
        const reviewRequest = this.model.get('reviewRequest');
        const fileAttachments = this.model.get('fileAttachments');
        const draft = reviewRequest.draft;
        this.#$warning = $('#review-request-warning');
        const $screenshots = $('#screenshot-thumbnails');
        this.#$attachments = $('#file-list');
        this.#$attachmentsContainer = $('#file-list-container');
        this.#$bannersContainer = $('#review-request-banners');
        this.#$main = $('#review-request-main');
        this.#$extra = $('#review-request-extra');

        /*
         * We need to show any banners before we render the fields, since the
         * banners can add their own fields.
         */
        this.showBanner();
        if (this.model.get('editable')) {
          RB.DnDUploader.instance.registerDropTarget(this.#$attachmentsContainer, gettext("Drop to add a file attachment"), this._uploadFile.bind(this));
        }
        this.#$attachments.find('.file-container').remove();
        fileAttachments.each(fileAttachment => this.buildFileAttachmentThumbnail(fileAttachment, fileAttachments, {
          noAnimation: true
        }));
        this.#$attachmentsContainer.find('.djblets-o-spinner').remove();
        this.#$attachmentsContainer.attr('aria-busy', 'false');
        this.listenTo(fileAttachments, 'add', this.buildFileAttachmentThumbnail);
        this.listenTo(fileAttachments, 'remove', this._removeThumbnail);
        this.listenTo(fileAttachments, 'destroy', () => {
          if (fileAttachments.length === 0) {
            this.#$attachmentsContainer.hide();
          }
        });
        this.listenTo(this.model, 'replaceAttachment', this._removeThumbnail);

        /*
         * Import all the screenshots and file attachments rendered onto
         * the page.
         */
        _.each($screenshots.find('.screenshot-container'), this._importScreenshotThumbnail, this);
        _.each($('.binary'), this._importFileAttachmentThumbnail, this);

        // Render all the field views.
        for (const fieldView of Object.values(this.#fieldViews)) {
          fieldView.render();
        }
        this._setupActions();
        this.model.on('publishError', errorText => {
          alert(errorText);
          this.$('#btn-draft-publish').enable();
          this.$('#btn-draft-discard').enable();
        });
        this.model.on('closeError', errorText => alert(errorText));
        this.model.on('saved', this.showBanner, this);
        this.model.on('published', this._refreshPage, this);
        reviewRequest.on('closed reopened', this._refreshPage, this);
        draft.on('destroyed', this._refreshPage, this);
        window.onbeforeunload = this._onBeforeUnload.bind(this);
      }

      /**
       * Prompt the user to load an unpublished draft.
       */
      promptToLoadUserDraft() {
        const loadDraft = () => {
          this.model.set('viewingUserDraft', true);
        };
        const buttons = [ink.paintComponent("Ink.Button", {
          type: "primary",
          onClick: () => loadDraft()
        }, gettext("Load Draft Data")), ink.paintComponent("Ink.Button", null, gettext("Cancel"))];
        $('<div>').append(gettext("<p>This review request is owned by another user and has an unpublished draft.</p> <p>Before making any changes to the review request, you will need to view the draft.</p>")).modalBox({
          buttons: buttons,
          title: gettext("View draft data")
        });
      }

      /**
       * Warn the user if they try to navigate away with unsaved comments.
       *
       * Args:
       *     evt (Event):
       *         The event that triggered the handler.
       *
       * Returns:
       *     string:
       *     The warning message.
       *
       */
      _onBeforeUnload(evt) {
        if (this.model.get('editCount') > 0) {
          /*
           * On IE, the text must be set in evt.returnValue.
           *
           * On Firefox, it must be returned as a string.
           *
           * On Chrome, it must be returned as a string, but you
           * can't set it on evt.returnValue (it just ignores it).
           */
          const msg = gettext("You have unsaved changes that will be lost if you navigate away from this page.");
          evt = evt || window.event;
          evt.returnValue = msg;
          return msg;
        }
      }

      /**
       * Show a banner for the given state of the review request.
       */
      showBanner() {
        if (this.banner) {
          return;
        }
        const reviewRequest = this.model.get('reviewRequest');
        const state = reviewRequest.get('state');
        let BannerClass;
        if (state === RB.ReviewRequest.CLOSE_SUBMITTED) {
          BannerClass = CompletedBannerView;
        } else if (state === RB.ReviewRequest.CLOSE_DISCARDED) {
          BannerClass = DiscardedBannerView;
        } else if (state === RB.ReviewRequest.PENDING && this.model.get('hasDraft') && !RB.EnabledFeatures.unifiedBanner) {
          BannerClass = DraftBannerView;
        } else {
          return;
        }
        let $existingBanner = this.#$bannersContainer.children();
        console.assert(BannerClass);
        console.assert($existingBanner.length <= 1);
        if ($existingBanner.length === 0) {
          $existingBanner = undefined;
        }
        this.banner = new BannerClass({
          el: $existingBanner,
          reviewRequestEditorView: this
        });
        if ($existingBanner) {
          $existingBanner.show();
        } else {
          this.banner.$el.appendTo(this.#$bannersContainer);
        }
        this.banner.render();
      }

      /**
       * Add a review reply editor view.
       *
       * These views are constructed by the individual review views. We keep
       * track of them here so that we can save any open editors when performing
       * publish operations.
       *
       * Args:
       *     reviewReplyEditorView (RB.ReviewRequestPage.ReviewReplyEditorView):
       *          The review reply editor view.
       */
      addReviewReplyEditorView(reviewReplyEditorView) {
        this.#reviewReplyEditorViews.push(reviewReplyEditorView);
      }

      /**
       * Handle a click on the "Publish Draft" button.
       *
       * Begins publishing the review request. If there are any field editors
       * still open, they'll be saved first.
       *
       * Args:
       *     options (object):
       *         Options for the publish operation.
       */
      async publishDraft(options) {
        this.model.set({
          publishing: true
        });
        await this.saveOpenEditors();
        await this.model.publishDraft(options);
      }

      /**
       * Finish saving all open editors.
       */
      async saveOpenEditors() {
        await Promise.all(Object.values(this.#fieldViews).filter(field => field.needsSave()).map(field => field.finishSave()));
        await Promise.all(this.#reviewReplyEditorViews.filter(view => view.needsSave()).map(field => field.save()));
      }

      /**
       * Upload a dropped file as a file attachment.
       *
       * A temporary file attachment placeholder will appear while the
       * file attachment uploads. After the upload has finished, it will
       * be replaced with the thumbnail depicting the file attachment.
       *
       * Args:
       *     file (File):
       *         The file to upload.
       */
      _uploadFile(file) {
        const reviewRequestEditor = this.model;
        if (reviewRequestEditor.hasUnviewedUserDraft) {
          this.promptToLoadUserDraft();
        } else {
          // Create a temporary file listing.
          const fileAttachment = this.model.createFileAttachment();
          fileAttachment.set('file', file);
          fileAttachment.save();
        }
      }

      /**
       * Set up all review request actions and listens for events.
       */
      _setupActions() {
        RB.ReviewRequestActionHook.each(hook => {
          _.each(hook.get('callbacks'), (handler, selector) => this.$(selector).click(handler));
        });
      }

      /**
       * Build a thumbnail for a FileAttachment.
       *
       * The thumbnail will be added to the page. The editor will listen
       * for events on the thumbnail to update the current edit state.
       *
       * This can be called either when dynamically adding a new file
       * attachment (through drag-and-drop or Add File), or after importing
       * from the rendered page.
       *
       * Args:
       *     fileAttachment (FileAttachment):
       *         The file attachment.
       *
       *     collection (Backbone.Collection):
       *         The collection of all file attachments.
       *
       *     options (object):
       *         Options.
       *
       * Option Args:
       *     $el (jQuery):
       *         The thumbnail element, if it already exists in the DOM.
       *
       *     noAnimation (boolean):
       *         Whether to disable animation.
       */
      buildFileAttachmentThumbnail(fileAttachment, collection, options = {}) {
        const fileAttachmentComments = this.model.get('fileAttachmentComments');
        const $thumbnail = options.$el;
        const view = new FileAttachmentThumbnailView({
          canEdit: this.model.get('editable') === true,
          comments: fileAttachmentComments[fileAttachment.id],
          el: $thumbnail,
          model: fileAttachment,
          renderThumbnail: $thumbnail === undefined,
          reviewRequest: this.model.get('reviewRequest'),
          reviewRequestEditor: this.model,
          reviewRequestEditorView: this
        });
        view.render();
        this.#fileAttachmentThumbnailViews.push(view);
        if (!$thumbnail) {
          // This is a newly added file attachment.
          const fileAttachments = this.model.get('fileAttachments');
          const index = fileAttachments.indexOf(fileAttachment);
          this.#$attachmentsContainer.show();
          view.$el.insertBefore(this.#$attachments.children().eq(index));
          if (!options.noAnimation) {
            view.fadeIn();
          }
        }
        this.listenTo(view, 'hoverIn', $thumbnail => {
          this.#$attachments.find('.file').not($thumbnail.find('.file')[0]).addClass('faded');
        });
        this.listenTo(view, 'hoverOut', () => this.#$attachments.find('.file').removeClass('faded'));
        view.on('beginEdit', () => this.model.incr('editCount'));
        view.on('endEdit', () => this.model.decr('editCount'));
        if (!RB.EnabledFeatures.unifiedBanner) {
          view.on('commentSaved', () => RB.DraftReviewBannerView.instance.show());
        }
      }

      /**
       * Import file attachments from the rendered page.
       *
       * Each file attachment already rendered will be turned into a
       * FileAttachment, and a new thumbnail will be built for it.
       *
       * Args:
       *     thumbnailEl (Element):
       *         The existing DOM element to import.
       */
      _importFileAttachmentThumbnail(thumbnailEl) {
        const $thumbnail = $(thumbnailEl);
        const id = $thumbnail.data('file-id');
        const $caption = $thumbnail.find('.file-caption .edit');
        const reviewRequest = this.model.get('reviewRequest');
        const fileAttachment = reviewRequest.draft.createFileAttachment({
          id: id
        });
        if (!$caption.hasClass('empty-caption')) {
          fileAttachment.set('caption', $caption.text());
        }
        this.model.get('fileAttachments').add(fileAttachment, {
          $el: $thumbnail
        });
      }

      /**
       * Import screenshots from the rendered page.
       *
       * Each screenshot already rendered will be turned into a Screenshot.
       *
       * Args:
       *     thumbnailEl (Element):
       *         The existing DOM element to import.
       */
      _importScreenshotThumbnail(thumbnailEl) {
        const $thumbnail = $(thumbnailEl);
        const id = $thumbnail.data('screenshot-id');
        const reviewRequest = this.model.get('reviewRequest');
        const screenshot = reviewRequest.createScreenshot(id);
        const view = new RB.ScreenshotThumbnail({
          el: $thumbnail,
          model: screenshot
        });
        view.render();
        this.model.get('screenshots').add(screenshot);
        view.on('beginEdit', () => this.model.incr('editCount'));
        view.on('endEdit', () => this.model.decr('editCount'));
      }

      /**
       * Refresh the page.
       */
      _refreshPage() {
        RB.navigateTo(this.model.get('reviewRequest').get('reviewURL'));
      }

      /**
       * Remove a file attachment thumbnail.
       *
       * Version Added:
       *     6.0
       *
       * Args:
       *     attachmentModel (FileAttachment):
       *         The model of the file attachment to remove.
       */
      _removeThumbnail(attachmentModel) {
        const thumbnailViews = this.#fileAttachmentThumbnailViews;
        const index = thumbnailViews.findIndex(view => view.model === attachmentModel);
        thumbnailViews[index].remove();
        thumbnailViews.splice(index, 1);
      }
    }) || _class6$1;

    var _class$7, _class2$1;

    /**
     * Update information as received from the server.
     */

    /**
     * Options for the UpdatesBubbleView.
     */
    /**
     * An update bubble showing an update to the review request or a review.
     */
    let UpdatesBubbleView = spina.spina(_class$7 = class UpdatesBubbleView extends spina.BaseView {
      static className = 'rb-c-page-updates-bubble';
      static id = 'updates-bubble';
      static events = {
        'click [data-action=ignore]': '_onIgnoreClicked',
        'click [data-action=update]': '_onUpdatePageClicked'
      };

      /**********************
       * Instance variables *
       **********************/

      /** Options for the view. */

      /**
       * Initialize the view.
       *
       * Args:
       *     options (UpdatesBubbleViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        this.options = options;
      }

      /**
       * Render the bubble with the information provided during construction.
       *
       * The bubble starts hidden. The caller must call open() to display it.
       */
      onInitialRender() {
        const el = this.el;
        const updateInfo = this.options.updateInfo;
        const user = updateInfo.user;
        el.setAttribute('role', 'status');
        const updateText = gettext("Update page");
        const closeText = gettext("Close notification");

        /*
         * NOTE: Icons are elements within an <a>, instead of mixed in to the
         *       action, in order to ensure focus outlines work correctly
         *       across all browsers.
         */
        ink.renderInto(this.el, [ink.craftComponent("div", {
          "class": "rb-c-page-updates-bubble__message"
        }, `${updateInfo.summary} by `, ink.craftComponent("a", {
          href: user.url
        }, user.fullname || user.username)), ink.craftComponent("div", {
          "class": "rb-c-page-updates-bubble__actions"
        }, ink.craftComponent("a", {
          "class": "rb-c-page-updates-bubble__action",
          "data-action": "update",
          title: updateText,
          role: "button",
          tabindex: "0",
          href: "#"
        }, ink.craftComponent("span", {
          "class": "ink-i-refresh",
          "aria-hidden": "true"
        })), ink.craftComponent("a", {
          "class": "rb-c-page-updates-bubble__action",
          "data-action": "ignore",
          title: closeText,
          role: "button",
          tabindex: "0",
          href: "#"
        }, ink.craftComponent("span", {
          "class": "ink-i-close",
          "aria-hidden": "true"
        })))]);
      }

      /**
       * Open the bubble on the screen.
       */
      open() {
        /* Give the element time to settle before we animate it. */
        _.defer(() => this.el.classList.add('-is-open'));
      }

      /**
       * Close the update bubble.
       *
       * After closing, the bubble will be removed from the DOM.
       */
      close() {
        this.el.classList.remove('-is-open');
        _.defer(() => {
          this.trigger('closed');
          this.remove();
        });
      }

      /**
       * Handle clicks on the "Update Page" link.
       *
       * Loads the review request page.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event which triggered the action.
       */
      _onUpdatePageClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger('updatePage');
      }

      /*
       * Handle clicks on the "Ignore" link.
       *
       * Ignores the update and closes the page.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event which triggered the action.
       */
      _onIgnoreClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      }
    }) || _class$7;
    /**
     * Options for the ReviewablePageView.
     */
    /**
     * A page managing reviewable content for a review request.
     *
     * This provides common functionality for any page associated with a review
     * request, such as the diff viewer, review UI, or the review request page
     * itself.
     */
    let ReviewablePageView = spina.spina(_class2$1 = class ReviewablePageView extends RB.PageView {
      static events = {
        'click #action-legacy-edit-review': '_onEditReviewClicked',
        'click #action-legacy-add-general-comment': 'addGeneralComment',
        'click #action-legacy-ship-it': 'shipIt',
        'click .rb-o-mobile-menu-label': '_onMenuClicked'
      };

      /**********************
       * Instance variables *
       **********************/

      /** The review request editor. */

      /** The draft review banner, if present. */

      /** The unified banner, if present. */
      unifiedBanner = null;

      /** The star manager. */
      #starManager;

      /** The URL to the default favicon. */
      #favIconURL = null;

      /** The URL to the favicon showing an active notification. */
      #favIconNotifyURL = null;

      /** The URL to the logo image to use for notifications. */
      #logoNotificationsURL = null;

      /** The updates bubble view. */
      _updatesBubble = null;

      /**
       * Initialize the page.
       *
       * This will construct a ReviewRequest, CommentIssueManager,
       * ReviewRequestEditor, and other required objects, based on data
       * provided during construction.
       *
       * Args:
       *     options (ReviewablePageViewOptions):
       *         Options for the view.
       */
      initialize(options) {
        super.initialize(options);
        this.options = options;
        RB.DnDUploader.create();
        this.reviewRequestEditorView = new ReviewRequestEditorView({
          el: $('#review-request'),
          inMobileMode: this.inMobileMode,
          model: this.model.reviewRequestEditor
        });

        /*
         * Some extensions, like Power Pack and rbstopwatch, expect a few
         * legacy attributes on the view. Set these here so these extensions
         * can access them. Note that extensions should ideally use the new
         * form, if they're able to support Review Board 3.0+.
         */
        ['reviewRequest', 'pendingReview'].forEach(attrName => {
          this[attrName] = this.model.get(attrName);
          this.listenTo(this.model, `change:${attrName}`, () => {
            this[attrName] = this.model.get(attrName);
          });
        });

        /*
         * Allow the browser to report notifications, if the user has this
         * enabled.
         */
        RB.NotificationManager.instance.setup();
        if (RB.UserSession.instance.get('authenticated')) {
          this.#starManager = new RB.StarManagerView({
            el: this.$('.star').parent(),
            model: new RB.StarManager()
          });
        }
        this.listenTo(this.model, 'reviewRequestUpdated', this._onReviewRequestUpdated);
      }

      /**
       * Render the page.
       */
      renderPage() {
        const $favicon = $('head').find('link[rel="shortcut icon"]');
        this.#favIconURL = $favicon.attr('href');
        this.#favIconNotifyURL = STATIC_URLS['rb/images/favicon_notify.ico'];
        this.#logoNotificationsURL = STATIC_URLS['rb/images/logo.png'];
        const pendingReview = this.model.get('pendingReview');
        const reviewRequest = this.model.get('reviewRequest');
        if (RB.EnabledFeatures.unifiedBanner) {
          if (RB.UserSession.instance.get('authenticated')) {
            this.unifiedBanner = new UnifiedBannerView({
              el: $('#unified-banner'),
              model: new UnifiedBanner({
                pendingReview: pendingReview,
                reviewRequest: reviewRequest,
                reviewRequestEditor: this.model.reviewRequestEditor
              }),
              reviewRequestEditorView: this.reviewRequestEditorView
            });
            this.unifiedBanner.render();
          }
        } else {
          this.draftReviewBanner = RB.DraftReviewBannerView.create({
            el: $('#review-banner'),
            model: pendingReview,
            reviewRequestEditor: this.model.reviewRequestEditor
          });
          this.listenTo(pendingReview, 'destroy published', () => this.draftReviewBanner.hideAndReload());
        }
        this.listenTo(this.model.reviewRequestEditor, 'change:viewingUserDraft', this._onViewingUserDraftChanged);
        this.reviewRequestEditorView.render();
      }

      /**
       * Remove this view from the page.
       *
       * Returns:
       *     ReviewablePageView:
       *     This object, for chaining.
       */
      remove() {
        if (this.draftReviewBanner) {
          this.draftReviewBanner.remove();
        }
        if (this.unifiedBanner) {
          this.unifiedBanner.remove();
        }
        return super.remove();
      }

      /**
       * Return data to use for assessing cross-tab page reloads.
       *
       * This returns a filter blob that will be recognized by all other tabs
       * that have the same review request.
       *
       * Version Added:
       *     6.0
       */
      getReloadData() {
        return {
          'review-request': this.model.get('reviewRequest').id
        };
      }

      /**
       * Return the review request editor view.
       *
       * Returns:
       *     ReviewRequestEditorView:
       *     The review request editor view.
       */
      getReviewRequestEditorView() {
        return this.reviewRequestEditorView;
      }

      /**
       * Return the review request editor model.
       *
       * Returns:
       *     ReviewRequestEditor:
       *     The review request editor model.
       */
      getReviewRequestEditorModel() {
        return this.model.reviewRequestEditor;
      }

      /**
       * Handle mobile mode changes.
       *
       * This will set the mobile mode on the review request editor view.
       *
       * Version Added:
       *     7.0.3
       *
       * Args:
       *     inMobileMode (boolean):
       *         Whether the UI is now in mobile mode. This will be the same
       *         value as :js:attr:`inMobileMode`, and is just provided for
       *         convenience.
       */
      onMobileModeChanged(inMobileMode) {
        this.reviewRequestEditorView.inMobileMode = inMobileMode;
      }

      /**
       * Catch the review updated event and send the user a visual update.
       *
       * This function will handle the review updated event and decide whether
       * to send a notification depending on browser and user settings.
       *
       * Args:
       *     info (UpdateInfo):
       *         The last update information for the request.
       */
      _onReviewRequestUpdated(info) {
        this.#updateFavIcon(this.#favIconNotifyURL);
        if (RB.NotificationManager.instance.shouldNotify()) {
          this._showDesktopNotification(info);
        }
        this._showUpdatesBubble(info);
      }

      /**
       * Create the updates bubble showing information about the last update.
       *
       * Args:
       *     info (UpdateInfo):
       *         The last update information for the request.
       */
      _showUpdatesBubble(info) {
        if (this._updatesBubble) {
          this._updatesBubble.remove();
        }
        const reviewRequest = this.model.get('reviewRequest');
        this._updatesBubble = new UpdatesBubbleView({
          updateInfo: info
        });
        this.listenTo(this._updatesBubble, 'closed', () => this.#updateFavIcon(this.#favIconURL));
        this.listenTo(this._updatesBubble, 'updatePage', () => {
          RB.navigateTo(reviewRequest.get('reviewURL'));
        });
        this._updatesBubble.render().$el.appendTo(this.$el);
        this._updatesBubble.open();
      }

      /**
       * Show the user a desktop notification for the last update.
       *
       * This function will create a notification if the user has not
       * disabled desktop notifications and the browser supports HTML5
       * notifications.
       *
       *  Args:
       *     info (UpdateInfo):
       *         The last update information for the request.
       */
      _showDesktopNotification(info) {
        const reviewRequest = this.model.get('reviewRequest');
        const name = info.user.fullname || info.user.username;
        RB.NotificationManager.instance.notify({
          body: interpolate(gettext("Review request #%(value1)s, by %(name)s"), {
            "value1": reviewRequest.id,
            "name": name
          }, true),
          iconURL: this.#logoNotificationsURL,
          onClick: () => {
            RB.navigateTo(reviewRequest.get('reviewURL'));
          },
          title: info.summary
        });
      }

      /**
       * Update the favicon for the page.
       *
       * This is used to change the favicon shown on the page based on whether
       * there's a server-side update notification for the review request.
       *
       * Args:
       *     url (string):
       *         The URL to use for the shortcut icon.
       */
      #updateFavIcon(url) {
        $('head').find('link[rel="shortcut icon"]').remove().end().append($('<link>').attr({
          href: url,
          rel: 'shortcut icon',
          type: 'image/x-icon'
        }));
      }

      /**
       * Handle a click on the "Edit Review" button.
       *
       * Displays a review dialog.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event which triggered the action.
       */
      _onEditReviewClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        ReviewDialogView.create({
          review: this.model.get('pendingReview'),
          reviewRequestEditor: this.model.reviewRequestEditor
        });
        return false;
      }

      /**
       * Add a new general comment.
       *
       * Args:
       *     e (JQuery.ClickEvent, optional):
       *         The event which triggered the action.
       */
      addGeneralComment(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const pendingReview = this.model.get('pendingReview');
        const comment = pendingReview.createGeneralComment(undefined, RB.UserSession.instance.get('commentsOpenAnIssue'));
        if (!RB.EnabledFeatures.unifiedBanner) {
          this.listenTo(comment, 'saved', () => RB.DraftReviewBannerView.instance.show());
        }
        RB.CommentDialogView.create({
          comment: comment,
          reviewRequestEditor: this.model.reviewRequestEditor
        });
        return false;
      }

      /**
       * Handle a click on the "Ship It" button.
       *
       * Confirms that the user wants to post the review, and then posts it
       * and reloads the page.
       *
       * Args:
       *     e (JQuery.ClickEvent, optional):
       *         The event which triggered the action, if available.
       */
      async shipIt(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (confirm(gettext("Are you sure you want to post this review?"))) {
          // JQ获取ID元素文本
          const idElement = $('#diff-revision-id').text();
          await this.model.markShipIt(idElement);
          const reviewRequest = this.model.get('reviewRequest');
          RB.navigateTo(reviewRequest.get('reviewURL'));
        }
        return false;
      }

      /**
       * Generic handler for menu clicks.
       *
       * This simply prevents the click from bubbling up or invoking the
       * default action. This function is used for dropdown menu titles
       * so that their links do not send a request to the server when one
       * of their dropdown actions are clicked.
       *
       * Args:
       *     e (JQuery.ClickEvent):
       *         The event which triggered the action.
       */
      _onMenuClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        const $menuButton = $(e.currentTarget).find('a');
        const expanded = $menuButton.attr('aria-expanded');
        const target = $menuButton.attr('aria-controls');
        const $target = this.$(`#${target}`);
        if (expanded === 'false') {
          $menuButton.attr('aria-expanded', 'true');
          $target.addClass('-is-visible');
        } else {
          $menuButton.attr('aria-expanded', 'false');
          $target.removeClass('-is-visible');
        }
      }

      /**
       * Callback for when the viewingUserDraft attribute of the editor changes.
       *
       * This will reload the page with the new value of the ``view-draft`` query
       * parameter.
       *
       * Args:
       *     model (ReviewRequestEditor):
       *         The review request editor model.
       *
       *     newValue (boolean):
       *         The new value of the viewingUserDraft attribute.
       */
      _onViewingUserDraftChanged(model, newValue) {
        const location = window.location;
        const params = new URLSearchParams(location.search);
        if (newValue) {
          params.set('view-draft', '1');
        } else {
          params.delete('view-draft');
        }
        let url = location.pathname;
        if (params.size) {
          url += `?${params}`;
        }
        RB.navigateTo(url);
      }
    }) || _class2$1;

    var _dec$1, _class$6;

    /** Options for adding a toggle button to the diff view. */

    /**
     * A page view for the diff viewer.
     *
     * This provides functionality for the diff viewer page for managing the
     * loading and display of diffs, and all navigation around the diffs.
     */
    let DiffViewerPageView = (_dec$1 = spina.spina({
      mixins: [RB.KeyBindingsMixin]
    }), _dec$1(_class$6 = class DiffViewerPageView extends ReviewablePageView {
      static SCROLL_BACKWARD = -1;
      static SCROLL_FORWARD = 1;
      static ANCHOR_COMMENT = 1;
      static ANCHOR_FILE = 2;
      static ANCHOR_CHUNK = 4;

      /** Number of pixels to offset when scrolling to anchors. */
      static DIFF_SCROLLDOWN_AMOUNT = 15;
      static fileEntryTemplate = _.template(`<div class="diff-container">
 <div class="diff-box">
  <table class="sidebyside loading <% if (newFile) { %>newfile<% } %>"
         id="file_container_<%- id %>">
   <thead>
    <tr class="filename-row">
     <th>
      <span class="djblets-o-spinner"></span>
      <%- filename %>
     </th>
    </tr>
   </thead>
  </table>
 </div>
</div>`);
      static viewToggleButtonContentTemplate = _.template(`<span class="fa <%- iconClass %>"></span> <%- text %>`);

      /* Template for code line link anchor */
      static anchorTemplate = _.template('<a name="<%- anchorName %>" class="highlight-anchor"></a>');
      keyBindings = {
        'aAKP<m': '_selectPreviousFile',
        'fFJN>': '_selectNextFile',
        'sSkp,': '_selectPreviousDiff',
        'dDjn.': '_selectNextDiff',
        '[x': '_selectPreviousComment',
        ']c': '_selectNextComment',
        '\x0d': '_recenterSelected',
        'rR': '_createComment'
      };

      /**********************
       * Instance variables *
       **********************/

      #$controls = null;
      #$diffs = null;
      #$highlightedChunk = null;
      #$window;
      #chunkHighlighter = null;
      #commentsHintView = null;
      #diffFileIndexView = null;
      #diffRevisionLabelView = null;
      #diffRevisionSelectorView = null;
      #paginationView1 = null;
      #paginationView2 = null;
      #startAtAnchorName = null;
      _commitListView = null;
      _diffReviewableViews = [];
      _selectedAnchorIndex = -1;
      /**
       * Initialize the diff viewer page.
       *
       * Args:
       *     options (ReviewablePageViewOptions):
       *         Options for the view.
       *
       *  See Also:
       *      :js:class:`RB.ReviewablePageView`:
       *          For the option arguments this method takes.
       */
      initialize(options) {
        super.initialize(options);
        this.#$window = $(window);
        this._$anchors = $();

        /*
         * Listen for the construction of added DiffReviewables.
         *
         * We'll queue up the loading and construction of a view when added.
         * This will ultimately result in a DiffReviewableView being
         * constructed, once the data from the server is loaded.
         */
        this.listenTo(this.model.diffReviewables, 'add', this.#onDiffReviewableAdded);

        /*
         * Listen for when we're started and finished populating the list
         * of DiffReviewables. We'll use these events to clear and start the
         * diff loading queue.
         */
        const diffQueue = $.funcQueue('diff_files');
        this.listenTo(this.model.diffReviewables, 'populating', () => {
          this._diffReviewableViews.forEach(view => view.remove());
          this._diffReviewableViews = [];
          this.#diffFileIndexView.clear();
          this.#$diffs.children('.diff-container').remove();
          this.#$highlightedChunk = null;
          diffQueue.clear();
        });
        this.listenTo(this.model.diffReviewables, 'populated', () => diffQueue.start());
        this.router = new spina.Router();
        this.router.route(/^(\d+(?:-\d+)?)\/?(\?[^#]*)?/, 'revision', (revision, queryStr) => {
          const queryArgs = Djblets.parseQueryString(queryStr || '');
          const page = queryArgs.page;
          const revisionRange = revision.split('-', 2);
          const interdiffRevision = revisionRange.length === 2 ? parseInt(revisionRange[1], 10) : null;
          let baseCommitID = null;
          let tipCommitID = null;
          if (interdiffRevision === null) {
            baseCommitID = queryArgs['base-commit-id'] || null;
            tipCommitID = queryArgs['tip-commit-id'] || null;
            if (baseCommitID !== null) {
              baseCommitID = parseInt(baseCommitID, 10);
            }
            if (tipCommitID !== null) {
              tipCommitID = parseInt(tipCommitID, 10);
            }
          }
          this.model.loadDiffRevision({
            baseCommitID: baseCommitID,
            filenamePatterns: queryArgs.filenames || null,
            interdiffRevision: interdiffRevision,
            page: page ? parseInt(page, 10) : 1,
            revision: parseInt(revisionRange[0], 10),
            tipCommitID: tipCommitID
          });
        });

        /*
         * Begin managing the URL history for the page, so that we can
         * switch revisions and handle pagination while keeping the history
         * clean and the URLs representative of the current state.
         *
         * Note that Backbone will attempt to convert the hash to part of
         * the page URL, stripping away the "#". This will result in a
         * URL pointing to an incorrect, possible non-existent diff revision.
         *
         * We work around that by saving the values for the hash and query
         * string (up above), and by later replacing the current URL with a
         * new one that, amongst other things, contains the hash present
         * when the page was loaded.
         */
        Backbone.history.start({
          hashChange: false,
          pushState: true,
          root: `${this.model.get('reviewRequest').get('reviewURL')}diff/`,
          silent: true
        });
        this._setInitialURL(document.location.search || '', RB.getLocationHash());
      }

      /**
       * Remove the view from the page.
       *
       * Returns:
       *     DiffViewerPageView:
       *     This object, for chaining.
       */
      remove() {
        this.#$window.off(`resize.${this.cid}`);
        if (this.#diffFileIndexView) {
          this.#diffFileIndexView.remove();
        }
        if (this._commitListView) {
          this._commitListView.remove();
        }
        return super.remove();
      }

      /**
       * Render the page and begins loading all diffs.
       *
       * Returns:
       *     RB.DiffViewerPageView:
       *     This instance, for chaining.
       */
      renderPage() {
        super.renderPage();
        const model = this.model;
        const session = RB.UserSession.instance;
        this.#$controls = $('#view_controls');

        /* Set up the view buttons. */
        this.addViewToggleButton({
          activeDescription: gettext("All lines of the files are being shown. Toggle to collapse down to only modified sections instead."),
          activeText: gettext("Collapse changes"),
          id: 'action-diff-toggle-collapse-changes',
          inactiveDescription: gettext("Only modified sections of the files are being shown. Toggle to show all lines instead."),
          inactiveText: gettext("Expand changes"),
          isActive: !this.model.get('allChunksCollapsed'),
          onToggled: isActive => {
            RB.navigateTo(isActive ? '.?expand=1' : '.?collapse=1');
          }
        });
        if (model.get('canToggleExtraWhitespace')) {
          this.addViewToggleButton({
            activeDescription: gettext("Mismatched indentation and trailing whitespace are being shown. Toggle to hide instead."),
            activeText: gettext("Hide extra whitespace"),
            id: 'action-diff-toggle-extra-whitespace',
            inactiveDescription: gettext("Mismatched indentation and trailing whitespace are being hidden. Toggle to show instead."),
            inactiveText: gettext("Show extra whitespace"),
            isActive: session.get('diffsShowExtraWhitespace'),
            onToggled: isActive => {
              session.set('diffsShowExtraWhitespace', isActive);
            }
          });
        }
        this.addViewToggleButton({
          activeDescription: gettext("Sections of the diff containing only whitespace changes are being shown. Toggle to hide those instead."),
          activeText: gettext("Hide whitespace-only changes"),
          id: 'action-diff-toggle-whitespace-only',
          inactiveDescription: gettext("Sections of the diff containing only whitespace changes are being hidden. Toggle to show those instead."),
          inactiveText: gettext("Show whitespace-only changes"),
          isActive: true,
          onToggled: () => {
            this._diffReviewableViews.forEach(view => view.toggleWhitespaceOnlyChunks());
          }
        });

        /* Listen for changes on the commit selector. */
        if (!model.commits.isEmpty()) {
          const commitListModel = new RB.DiffCommitList({
            baseCommitID: model.revision.get('baseCommitID'),
            commits: model.commits,
            historyDiff: model.commitHistoryDiff,
            tipCommitID: model.revision.get('tipCommitID')
          });
          this.listenTo(model.revision, 'change:baseCommitID change:tipCommitID', model => commitListModel.set({
            baseCommitID: model.get('baseCommitID'),
            tipCommitID: model.get('tipCommitID')
          }));
          this.listenTo(commitListModel, 'change:baseCommitID change:tipCommitID', this.#onCommitIntervalChanged);
          this._commitListView = new RB.DiffCommitListView({
            el: $('#diff_commit_list').find('.commit-list-container'),
            model: commitListModel,
            showInterCommitDiffControls: true
          });
          this._commitListView.render();
        }
        this.#diffFileIndexView = new DiffFileIndexView({
          collection: model.files,
          el: $('#diff_index').find('.diff-index-container')
        });
        this.#diffFileIndexView.render();
        this.listenTo(this.#diffFileIndexView, 'anchorClicked', this.selectAnchorByName);
        this.#diffRevisionLabelView = new RB.DiffRevisionLabelView({
          el: $('#diff_revision_label'),
          model: model.revision
        });
        this.#diffRevisionLabelView.render();
        this.listenTo(this.#diffRevisionLabelView, 'revisionSelected', this._onRevisionSelected);

        /*
         * Determine whether we need to show the revision selector. If there's
         * only one revision, we don't need to add it.
         */
        const numDiffs = model.get('numDiffs');
        if (numDiffs > 1) {
          this.#diffRevisionSelectorView = new RB.DiffRevisionSelectorView({
            el: $('#diff_revision_selector'),
            model: model.revision,
            numDiffs: numDiffs
          });
          this.#diffRevisionSelectorView.render();
          this.listenTo(this.#diffRevisionSelectorView, 'revisionSelected', this._onRevisionSelected);
        }
        this.#commentsHintView = new DiffCommentsHintView({
          el: $('#diff_comments_hint'),
          model: model.commentsHint
        });
        this.#commentsHintView.render();
        this.listenTo(this.#commentsHintView, 'revisionSelected', this._onRevisionSelected);
        this.listenTo(this.#commentsHintView, 'commitRangeSelected', this._onCommitRangeSelected);
        this.#paginationView1 = new RB.PaginationView({
          el: $('#pagination1'),
          model: model.pagination
        });
        this.#paginationView1.render();
        this.listenTo(this.#paginationView1, 'pageSelected', _.partial(this._onPageSelected, false));
        this.#paginationView2 = new RB.PaginationView({
          el: $('#pagination2'),
          model: model.pagination
        });
        this.#paginationView2.render();
        this.listenTo(this.#paginationView2, 'pageSelected', _.partial(this._onPageSelected, true));
        this.#$diffs = $('#diffs').bindClass(RB.UserSession.instance, 'diffsShowExtraWhitespace', 'ewhl');
        this.#chunkHighlighter = new RB.ChunkHighlighterView();
        this.#chunkHighlighter.render().$el.prependTo(this.#$diffs);
        $('#diff-details').removeClass('loading');
        $('#download-diff-action').bindVisibility(model, 'canDownloadDiff');
        this.#$window.on(`resize.${this.cid}`, _.throttleLayout(this.#onWindowResize.bind(this)));

        /*
         * Begin creating any DiffReviewableViews needed for the page, and
         * start loading their contents.
         */
        if (model.diffReviewables.length > 0) {
          model.diffReviewables.each(diffReviewable => this.#onDiffReviewableAdded(diffReviewable));
          $.funcQueue('diff_files').start();
        }
      }

      /**
       * Add a toggle button for changing the view of the diff.
       *
       * Args:
       *     options (ToggleButtonOptions):
       *         The options for the button.
       */
      addViewToggleButton(options) {
        console.assert(!!options);
        const $button = $('<button>');
        const updateButton = isActive => {
          let icon;
          let text;
          let description;
          if (isActive) {
            icon = 'fa-minus';
            text = options.activeText;
            description = options.activeDescription;
          } else {
            icon = 'fa-plus';
            text = options.inactiveText;
            description = options.inactiveDescription;
          }
          console.assert(text);
          console.assert(description);
          $button.data('is-active', isActive).attr('title', description).html(DiffViewerPageView.viewToggleButtonContentTemplate({
            iconClass: icon,
            text: text
          }));
        };
        updateButton(options.isActive);
        $button.attr('id', options.id).on('click', e => {
          e.preventDefault();
          e.stopPropagation();
          const isActive = !$button.data('is-active');
          updateButton(isActive);
          options.onToggled(isActive);
        });
        this.#$controls.append($('<li>').append($button));
      }

      /**
       * Queue the loading of the corresponding diff.
       *
       * When the diff is loaded, it will be placed into the appropriate location
       * in the diff viewer. The anchors on the page will be rebuilt. This will
       * then trigger the loading of the next file.
       *
       * Args:
       *     diffReviewable (RB.DiffReviewable):
       *         The diff reviewable for loading and reviewing the diff.
       *
       *     options (object):
       *         The option arguments that control the behavior of this function.
       *
       * Option Args:
       *     showDeleted (boolean, optional):
       *         Determines whether or not we want to requeue the corresponding
       *         diff in order to show its deleted content.
       */
      queueLoadDiff(diffReviewable, options = {}) {
        $.funcQueue('diff_files').add(async () => {
          const fileDiffID = diffReviewable.get('fileDiffID');
          if (!options.showDeleted && $(`#file${fileDiffID}`).length === 1) {
            /*
             * We already have this diff (probably pre-loaded), and we
             * don't want to requeue it to show its deleted content.
             */
            this.#renderFileDiff(diffReviewable);
          } else {
            /*
             * We either want to queue this diff for the first time, or we
             * want to requeue it to show its deleted content.
             */
            const prefix = options.showDeleted ? '#file' : '#file_container_';
            const html = await diffReviewable.getRenderedDiff(options);
            const $container = $(prefix + fileDiffID).parent();
            if ($container.length === 0) {
              /*
               * The revision or page may have changed. There's
               * no element to work with. Just ignore this and
               * move on to the next.
               */
              return;
            }
            $container.hide();

            /*
             * jQuery's html() and replaceWith() perform checks of
             * the HTML, looking for things like <script> tags to
             * determine how best to set the HTML, and possibly
             * manipulating the string to do some normalization of
             * for cases we don't need to worry about. While this
             * is all fine for most HTML fragments, this can be
             * slow for diffs, given their size, and is
             * unnecessary. It's much faster to just set innerHTML
             * directly.
             */
            $container.eq(0).html(html);
            this.#renderFileDiff(diffReviewable);
          }
        });
      }

      /**
       * Set up a diff as DiffReviewableView and renders it.
       *
       * This will set up a :js:class:`RB.DiffReviewableView` for the given
       * diffReviewable. The anchors from this diff render will be stored for
       * navigation.
       *
       * Once rendered and set up, the next diff in the load queue will be
       * pulled from the server.
       *
       * Args:
       *     diffReviewable (RB.DiffReviewable):
       *         The reviewable diff to render.
       */
      #renderFileDiff(diffReviewable) {
        const elementName = 'file' + diffReviewable.get('fileDiffID');
        const $el = $(`#${elementName}`);
        if ($el.length === 0) {
          /*
           * The user changed revisions before the file finished loading, and
           * the target element no longer exists. Just return.
           */
          $.funcQueue('diff_files').next();
          return;
        }

        /* Check if we're replacing a diff or adding a new one. */
        let isReplacing = true;
        let index = this._diffReviewableViews.findIndex(view => view.model === diffReviewable);
        if (index === -1) {
          index = this._diffReviewableViews.length;
          isReplacing = false;
        }
        const diffReviewableView = new DiffReviewableView({
          el: $el,
          model: diffReviewable
        });
        if (isReplacing) {
          this._diffReviewableViews.splice(index, 1, diffReviewableView);
        } else {
          this._diffReviewableViews.push(diffReviewableView);
        }
        diffReviewableView.render();
        diffReviewableView.$el.parent().show();
        this.#diffFileIndexView.addDiff(index, diffReviewableView);
        this.listenTo(diffReviewableView, 'fileClicked', () => {
          this.selectAnchorByName(diffReviewable.get('file').get('index'));
        });
        this.listenTo(diffReviewableView, 'chunkClicked', name => {
          this.selectAnchorByName(name, false);
        });
        this.listenTo(diffReviewableView, 'moveFlagClicked', line => {
          this.selectAnchor(this.$(`a[target=${line}]`));
        });

        /* We must rebuild this every time. */
        this._updateAnchors(diffReviewableView.$el);
        this.listenTo(diffReviewableView, 'chunkExpansionChanged', () => {
          /* The selection rectangle may not update -- bug #1353. */
          this.#highlightAnchor($(this._$anchors[this._selectedAnchorIndex]));
        });

        /*
         * Defer selection of the starting anchor until after we've unwound the
         * stack.
         *
         * This is necessary because the text comment flags will defer their
         * own show() call in order to let layout settle, and selectAnchor()
         * checks that the comment flag is visible.
         */
        _.defer(() => {
          if (this.#startAtAnchorName) {
            /*
             * See if we've loaded the anchor the user wants to start at.
             */
            let $anchor = $(document.getElementsByName(this.#startAtAnchorName));

            /*
             * Some anchors are added by the template (such as those at
             * comment locations), but not all are. If the anchor isn't
             * found, but the URL hash is indicating that we want to start
             * at a location within this file, add the anchor.
             */
            const urlSplit = this.#startAtAnchorName.split(',');
            if ($anchor.length === 0 && urlSplit.length === 2 && elementName === urlSplit[0]) {
              $anchor = $(DiffViewerPageView.anchorTemplate({
                anchorName: this.#startAtAnchorName
              }));
              diffReviewableView.$el.find(`tr[line='${urlSplit[1]}']`).addClass('highlight-anchor').append($anchor);
            }
            if ($anchor.length !== 0) {
              /*
               * selectAnchor will return false if we didn't actually
               * select it (for example, the comment flag is not yet
               * visible). In that case, we just wait for the next time
               * and hope we'll catch it.
               */
              if (this.selectAnchor($anchor)) {
                this.#startAtAnchorName = null;
              }
            }
          }
        });
        this.listenTo(diffReviewableView, 'showDeletedClicked', () => {
          this.queueLoadDiff(diffReviewable, {
            showDeleted: true
          });
          $.funcQueue('diff_files').start();
        });
        $.funcQueue('diff_files').next();
      }

      /**
       * Select the anchor at a specified location.
       *
       * By default, this will scroll the page to position the anchor near
       * the top of the view.
       *
       * Args:
       *     $anchor (jQuery):
       *         The anchor to select.
       *
       *     scroll (boolean, optional):
       *         Whether to scroll the page to the anchor. This defaults to
       *         ``true``.
       *
       * Returns:
       *     boolean:
       *     ``true`` if the anchor was found and selected. ``false`` if not
       *     found.
       */
      selectAnchor($anchor, scroll = true) {
        if (!$anchor || $anchor.length === 0 || $anchor.parent().is(':hidden')) {
          return false;
        }
        if (scroll !== false) {
          this._navigate({
            anchor: $anchor.attr('name'),
            updateURLOnly: true
          });
          const anchorOffset = $anchor.offset().top;
          let scrollAmount = 0;
          if (this.unifiedBanner) {
            /*
             * The scroll offset calculation when we're running with the
             * unified banner is somewhat complex because the height of the
             * banner isn't static. The file index gets docked into the
             * banner, and changes its height depending on what files are
             * shown in the viewport.
             *
             * In order to try to scroll to the position where the top of
             * the file is nicely visible, we end up doing this twice.
             * First we try to determine a scroll offset based on the
             * position of the anchor. We then rerun the calculation using
             * the new offset to dial in closer to the right place.
             *
             * This still may not be perfect, especially when file borders
             * are close to the boundary where they're scrolling on or off
             * the screen, but it generally seems to do pretty well.
             */
            const newOffset = this.#computeScrollHeight(anchorOffset - DiffViewerPageView.DIFF_SCROLLDOWN_AMOUNT);
            scrollAmount = this.#computeScrollHeight(anchorOffset - newOffset);
          } else if (RB.DraftReviewBannerView.instance) {
            scrollAmount = DiffViewerPageView.DIFF_SCROLLDOWN_AMOUNT + RB.DraftReviewBannerView.instance.getHeight();
          }
          this.#$window.scrollTop(anchorOffset - scrollAmount);
        }
        this.#highlightAnchor($anchor);
        for (let i = 0; i < this._$anchors.length; i++) {
          if (this._$anchors[i] === $anchor[0]) {
            this._selectedAnchorIndex = i;
            break;
          }
        }
        return true;
      }

      /**
       * Compute the ideal scroll offset based on the unified banner.
       *
       * This attempts to find the ideal scroll offset based on what the diff
       * file index is doing within the unified banner.
       *
       * Args:
       *     startingOffset (number):
       *         The target scroll offset.
       *
       * Returns:
       *     number:
       *     The number of pixels to adjust the starting offset by in order to
       *     maximize the likelihood of the anchor appearing at the top of the
       *     visible viewport.
       */
      #computeScrollHeight(startingOffset) {
        const $window = $(window);
        const bannerHeight = this.unifiedBanner.getHeight(false);
        const newDockHeight = this.#diffFileIndexView.getDockedIndexExtents(startingOffset + bannerHeight, startingOffset + $window.height() - bannerHeight).height;
        return bannerHeight + newDockHeight + 20 + DiffViewerPageView.DIFF_SCROLLDOWN_AMOUNT;
      }

      /**
       * Select an anchor by name.
       *
       * Args:
       *     name (string):
       *         The name of the anchor.
       *
       *     scroll (boolean, optional):
       *         Whether to scroll the page to the anchor. This defaults to
       *         ``true``.
       *
       * Returns:
       *     boolean:
       *     ``true`` if the anchor was found and selected. ``false`` if not
       *     found.
       */
      selectAnchorByName(name, scroll) {
        return this.selectAnchor($(document.getElementsByName(name)), scroll);
      }

      /**
       * Highlight a chunk bound to an anchor element.
       *
       * Args:
       *     $anchor (jQuery):
       *         The anchor to highlight.
       */
      #highlightAnchor($anchor) {
        this.#$highlightedChunk = $anchor.closest('tbody').add($anchor.closest('thead'));
        this.#chunkHighlighter.highlight(this.#$highlightedChunk);
      }

      /**
       * Update the list of known anchors.
       *
       * This will update the list of known anchors based on all named anchors
       * in the specified table. This is called after every part of the diff
       * that is loaded.
       *
       * If no anchor is selected, this will try to select the first one.
       *
       * Args:
       *     $table (jQuery):
       *         The table containing anchors.
       */
      _updateAnchors($table) {
        this._$anchors = this._$anchors.add($table.find('th a[name]'));

        /* Skip over the change index to the first item. */
        if (this._selectedAnchorIndex === -1 && this._$anchors.length > 0) {
          this._selectedAnchorIndex = 0;
          this.#highlightAnchor($(this._$anchors[this._selectedAnchorIndex]));
        }
      }

      /**
       * Return the next navigatable anchor.
       *
       * This will take a direction to search, starting at the currently
       * selected anchor. The next anchor matching one of the types in the
       * anchorTypes bitmask will be returned. If no anchor is found,
       * null will be returned.
       *
       * Args:
       *     dir (number):
       *         The direction to navigate in. This should be
       *         :js:data:`SCROLL_BACKWARD` or js:data:`SCROLL_FORWARD`.
       *
       *     anchorTypes (number):
       *         A bitmask of types to consider when searching for the next
       *         anchor.
       *
       * Returns:
       *     jQuery:
       *     The anchor, if found. If an anchor was not found, ``null`` is
       *     returned.
       */
      #getNextAnchor(dir, anchorTypes) {
        for (let i = this._selectedAnchorIndex + dir; i >= 0 && i < this._$anchors.length; i += dir) {
          const $anchor = $(this._$anchors[i]);
          if ($anchor.closest('tr').hasClass('dimmed')) {
            continue;
          }
          if (anchorTypes & DiffViewerPageView.ANCHOR_COMMENT && $anchor.hasClass('commentflag-anchor') || anchorTypes & DiffViewerPageView.ANCHOR_FILE && $anchor.hasClass('file-anchor') || anchorTypes & DiffViewerPageView.ANCHOR_CHUNK && $anchor.hasClass('chunk-anchor')) {
            return $anchor;
          }
        }
        return null;
      }

      /**
       * Select the previous file's header on the page.
       */
      _selectPreviousFile() {
        this.selectAnchor(this.#getNextAnchor(DiffViewerPageView.SCROLL_BACKWARD, DiffViewerPageView.ANCHOR_FILE));
      }

      /**
       * Select the next file's header on the page.
       */
      _selectNextFile() {
        this.selectAnchor(this.#getNextAnchor(DiffViewerPageView.SCROLL_FORWARD, DiffViewerPageView.ANCHOR_FILE));
      }

      /**
       * Select the previous diff chunk on the page.
       */
      _selectPreviousDiff() {
        this.selectAnchor(this.#getNextAnchor(DiffViewerPageView.SCROLL_BACKWARD, DiffViewerPageView.ANCHOR_CHUNK | DiffViewerPageView.ANCHOR_FILE));
      }

      /**
       * Select the next diff chunk on the page.
       */
      _selectNextDiff() {
        this.selectAnchor(this.#getNextAnchor(DiffViewerPageView.SCROLL_FORWARD, DiffViewerPageView.ANCHOR_CHUNK | DiffViewerPageView.ANCHOR_FILE));
      }

      /**
       * Select the previous comment on the page.
       */
      _selectPreviousComment() {
        this.selectAnchor(this.#getNextAnchor(DiffViewerPageView.SCROLL_BACKWARD, DiffViewerPageView.ANCHOR_COMMENT));
      }

      /**
       * Select the next comment on the page.
       */
      _selectNextComment() {
        this.selectAnchor(this.#getNextAnchor(DiffViewerPageView.SCROLL_FORWARD, DiffViewerPageView.ANCHOR_COMMENT));
      }

      /**
       * Re-center the currently selected area on the page.
       */
      _recenterSelected() {
        this.selectAnchor($(this._$anchors[this._selectedAnchorIndex]));
      }

      /**
       * Create a comment for a chunk of a diff
       */
      _createComment() {
        const chunkID = this.#$highlightedChunk[0].id;
        const chunkElement = document.getElementById(chunkID);
        if (chunkElement) {
          const lineElements = chunkElement.getElementsByTagName('tr');
          const beginLineNum = lineElements[0].getAttribute('line');
          const beginNode = lineElements[0].cells[2];
          const endLineNum = lineElements[lineElements.length - 1].getAttribute('line');
          const endNode = lineElements[lineElements.length - 1].cells[2];
          this._diffReviewableViews.forEach(diffReviewableView => {
            if ($.contains(diffReviewableView.el, beginNode)) {
              diffReviewableView.createComment(beginLineNum, endLineNum, beginNode, endNode);
            }
          });
        }
      }

      /**
       * Set the initial URL for the page.
       *
       * This accomplishes two things:
       *
       * 1. The user may have viewed ``diff/``, and not ``diff/<revision>/``,
       *    but we want to always show the revision in the URL. This ensures
       *    we have a URL equivalent to the one we get when clicking a revision
       *    in the slider.
       *
       * 2. We want to add back any hash and query string that may have been
       *    stripped away, so the URL doesn't appear to suddenly change from
       *    what the user expected.
       *
       * This won't invoke any routes or store any new history. The back button
       * will correctly bring the user to the previous page.
       *
       * Args:
       *     queryString (string):
       *         The query string provided in the URL.
       *
       *     anchor (string):
       *         The anchor provided in the URL.
       */
      _setInitialURL(queryString, anchor) {
        this.#startAtAnchorName = anchor || null;
        this._navigate({
          anchor: anchor,
          queryString: queryString,
          updateURLOnly: true
        });
      }

      /**
       * Navigate to a new page state by calculating and setting a URL.
       *
       * This builds a URL consisting of the revision range and any other
       * state that impacts the view of the page (page number and filtered list
       * of filename patterns), updating the current location in the browser and
       * (by default) triggering a route change.
       *
       * Args:
       *     options (object):
       *         The options for the navigation.
       *
       * Option Args:
       *     revision (number, optional):
       *         The revision (or first part of an interdiff range) to view.
       *         Defaults to the current revision.
       *
       *     interdiffRevision (number, optional):
       *         The second revision of an interdiff range to view.
       *         Defaults to the current revision for the interdiff, if any.
       *
       *     page (number, optional):
       *         A page number to specify. If not provided, and if the revision
       *         range has not changed, the existing value (or lack of one)
       *         in the URL will be used. If the revision range has changed and
       *         a value was not explicitly provided, a ``page=`` will not be
       *         added to the URL.
       *
       *     anchor (string, optional):
       *         An anchor name to navigate to. This cannot begin with ``#``.
       *
       *     queryString (string, optional):
       *         An explicit query string to use for the URL. If specified,
       *         a query string will not be computed. This must begin with ``?``.
       *
       *     updateURLOnly (boolean, optional):
       *         If ``true``, the location in the browser will be updated, but
       *         a route will not be triggered.
       *
       *     baseCommitID (string, optional):
       *         The ID of the base commit to use in the request.
       *
       *     tipCommitID (string, optional):
       *         The ID of the top commit to use in the request.
       */
      _navigate(options) {
        const curRevision = this.model.revision.get('revision');
        const curInterdiffRevision = this.model.revision.get('interdiffRevision');

        /* Start the URL off with the revision range. */
        const revision = options.revision !== undefined ? options.revision : curRevision;
        const interdiffRevision = options.interdiffRevision !== undefined ? options.interdiffRevision : curInterdiffRevision;
        let baseURL = revision;
        if (interdiffRevision) {
          baseURL += `-${interdiffRevision}`;
        }
        baseURL += '/';

        /*
         * If an explicit query string is provided, we'll just use that.
         * Otherwise, we'll generate one.
         */
        let queryString = options.queryString;
        if (queryString === undefined) {
          const queryParams = new URLSearchParams();

          /*
           * We want to be smart about when we include ?page=. We always
           * include it if it's explicitly specified in options. If it's
           * not, then we'll fall back to what's currently in the URL, but
           * only if the revision range is staying the same, otherwise we're
           * taking it out. This simulates the behavior we've always had.
           */
          let page = options.page;
          if (page === undefined && revision === curRevision && interdiffRevision === curInterdiffRevision) {
            /*
             * It's the same, so we can plug in the page from the
             * current URL.
             */
            page = this.model.pagination.get('currentPage');
          }
          if (page && page !== 1) {
            queryParams.set('page', page);
          }
          if (options.baseCommitID) {
            queryParams.set('base-commit-id', options.baseCommitID);
          }
          if (options.tipCommitID) {
            queryParams.set('tip-commit-id', options.tipCommitID);
          }
          const filenamePatterns = this.model.get('filenamePatterns');
          if (filenamePatterns && filenamePatterns.length > 0) {
            queryParams.set('filenames', filenamePatterns);
          }
          const reviewRequestEditor = this.model.reviewRequestEditor;
          if (reviewRequestEditor.get('viewingUserDraft')) {
            queryParams.set('view-draft', '1');
          }
          queryString = queryParams.toString();
        }
        const url = Djblets.buildURL({
          anchor: options.anchor,
          baseURL: baseURL,
          queryData: queryString
        });

        /*
         * Determine if we're performing the navigation or just updating the
         * displayed URL.
         */
        let navOptions;
        if (options.updateURLOnly) {
          navOptions = {
            replace: true,
            trigger: false
          };
        } else {
          navOptions = {
            trigger: true
          };
        }
        this.router.navigate(url, navOptions);
      }

      /**
       * Handler for when a DiffReviewable is added.
       *
       * This will add a placeholder entry for the file and queue the diff
       * for loading/rendering.
       *
       * Args:
       *     diffReviewable (RB.DiffReviewable):
       *         The DiffReviewable that was added.
       */
      #onDiffReviewableAdded(diffReviewable) {
        const file = diffReviewable.get('file');
        this.#$diffs.append(DiffViewerPageView.fileEntryTemplate({
          filename: file.get('origFilename'),
          id: file.id,
          newFile: file.get('isnew')
        }));
        this.queueLoadDiff(diffReviewable);
      }

      /**
       * Handler for when the window resizes.
       *
       * Triggers a relayout of all the diffs and the chunk highlighter.
       */
      #onWindowResize() {
        for (let i = 0; i < this._diffReviewableViews.length; i++) {
          this._diffReviewableViews[i].updateLayout();
        }
        this.#chunkHighlighter.updateLayout();
        if (this.unifiedBanner) {
          this.#diffFileIndexView.queueUpdateLayout();
        }
      }

      /**
       * Callback for when a new revision is selected.
       *
       * This supports both single revisions and interdiffs. If `base` is 0, a
       * single revision is selected. If not, the interdiff between `base` and
       * `tip` will be shown.
       *
       * This will always implicitly navigate to page 1 of any paginated diffs.
       *
       * Args:
       *     revisions (Array of number):
       *         The revision range to show.
       */
      _onRevisionSelected(revisions) {
        let base = revisions[0];
        let tip = revisions[1];
        if (base === 0) {
          /* This is a single revision, not an interdiff. */
          base = tip;
          tip = null;
        }
        this._navigate({
          interdiffRevision: tip,
          revision: base
        });
      }

      /**
       * Callback for when a commit range is selected.
       *
       * Args:
       *     revision (number):
       *         The diff revision to load.
       *
       *     baseCommit (number):
       *         The base commit to select.
       *
       *     tipCommit (number):
       *         The tip commit to select.
       */
      _onCommitRangeSelected(revision, baseCommit, tipCommit) {
        if (baseCommit === null) {
          this._navigate({
            revision: revision,
            interdiffRevision: null,
            tipCommitID: tipCommit.toString()
          });
        } else if (tipCommit === null) {
          this._navigate({
            baseCommitID: baseCommit.toString(),
            interdiffRevision: null,
            revision: revision
          });
        } else {
          this._navigate({
            baseCommitID: baseCommit.toString(),
            interdiffRevision: null,
            revision: revision,
            tipCommitID: tipCommit.toString()
          });
        }
      }

      /**
       * Callback for when a new page is selected.
       *
       * Navigates to the same revision with a different page number.
       *
       * Args:
       *     scroll (boolean):
       *         Whether to scroll to the file index.
       *
       *     page (number):
       *         The page number to navigate to.
       */
      _onPageSelected(scroll, page) {
        if (scroll) {
          this.selectAnchorByName('index_header', true);
        }
        this._navigate({
          page: page
        });
      }

      /**
       * Handle the selected commit interval changing.
       *
       * This will navigate to a diff with the selected base and tip commit IDs.
       *
       * Args:
       *     model (RB.DiffCommitList):
       *          The model that changed.
       */
      #onCommitIntervalChanged(model) {
        this._navigate({
          baseCommitID: model.get('baseCommitID'),
          tipCommitID: model.get('tipCommitID')
        });
      }

      /**
       * Callback for when the viewingUserDraft attribute of the editor changes.
       *
       * This will reload the page with the new value of the ``view-draft`` query
       * parameter.
       *
       * Args:
       *     model (ReviewRequestEditor):
       *         The review request editor model.
       *
       *     newValue (boolean):
       *         The new value of the viewingUserDraft attribute.
       */
      _onViewingUserDraftChanged(model, newValue) {
        if (newValue === false && this.model.revision.get('isDraftDiff')) {
          /*
           * If the privileged user is viewing a draft revision of the diff,
           * and they ask to go back to the non-draft view, we need to
           * go to the latest public revision.
           *
           * We jettison all interdiff/commit ID/page info and just load
           * the diff revision directly.
           */
          const baseURL = this.model.get('reviewRequest').get('reviewURL');
          const revision = this.model.revision.get('latestRevision') - 1;
          console.assert(revision >= 1);
          RB.navigateTo(`${baseURL}diff/${revision}/`);
        } else {
          super._onViewingUserDraftChanged(model, newValue);
        }
      }
    }) || _class$6);

    var _class$5;

    /**
     * Base support for displaying a review UI for file attachments.
     */
    let FileAttachmentReviewableView = spina.spina(_class$5 = class FileAttachmentReviewableView extends AbstractReviewableView {
      static commentsListName = 'file_attachment_comments';
    }) || _class$5;

    var _class$4;

    /**
     * A Review UI for file types which otherwise do not have one.
     *
     * Normally, file types that do not have a Review UI are not linked to one.
     * However, in the case of a file attachment with multiple revisions, if one of
     * those revisions is a non-reviewable type, the user can still navigate to
     * that page. This Review UI is used as a placeholder in that case--it shows
     * the header (with revision selector) and a message saying that this file type
     * cannot be shown.
     */
    let DummyReviewableView = spina.spina(_class$4 = class DummyReviewableView extends FileAttachmentReviewableView {
      static className = 'dummy-review-ui';
      static commentBlockView = AbstractCommentBlockView;
      static captionTableTemplate = _.template('<table><tr><%= items %></tr></table>');
      static captionItemTemplate = _.template(`<td>
 <h1 class="caption"><%- caption %></h1>
</td>`);
      static diffTypeMismatchTemplate = _.template(`<div class="dummy-review-ui-error">
 <span class="rb-icon rb-icon-warning"></span>
 <%- errorText %>
</div>`);

      /**********************
       * Instance variables *
       **********************/

      /**
       * Render the view.
       */
      renderContent() {
        const $header = $('<div>').addClass('review-ui-header').prependTo(this.$el);
        const model = this.model;
        const caption = model.get('caption');
        const revision = model.get('fileRevision');
        const diffCaption = model.get('diffCaption');
        const diffRevision = model.get('diffRevision');
        if (model.get('numRevisions') > 1) {
          const $revisionLabel = $('<div id="revision_label">').appendTo($header);
          const revisionLabelView = new RB.FileAttachmentRevisionLabelView({
            el: $revisionLabel,
            model: model
          });
          revisionLabelView.render();
          this.listenTo(revisionLabelView, 'revisionSelected', this.#onRevisionSelected);
          const $revisionSelector = $('<div id="attachment_revision_selector">').appendTo($header);
          const revisionSelectorView = new RB.FileAttachmentRevisionSelectorView({
            el: $revisionSelector,
            model: model
          });
          revisionSelectorView.render();
          this.listenTo(revisionSelectorView, 'revisionSelected', this.#onRevisionSelected);
          const captionItems = [];
          if (model.get('diffAgainstFileAttachmentID') !== null) {
            captionItems.push(DummyReviewableView.captionItemTemplate({
              caption: interpolate(gettext("%(diffCaption)s (revision %(diffRevision)s)"), {
                "diffCaption": diffCaption,
                "diffRevision": diffRevision
              }, true)
            }));
          }
          captionItems.push(DummyReviewableView.captionItemTemplate({
            caption: interpolate(gettext("%(caption)s (revision %(revision)s)"), {
              "caption": caption,
              "revision": revision
            }, true)
          }));
          $header.append(DummyReviewableView.captionTableTemplate({
            items: captionItems.join('')
          }));
        } else {
          $('<h1 class="caption file-attachment-single-revision">').text(model.get('caption')).appendTo($header);
        }
        if (model.get('diffTypeMismatch')) {
          this.$el.append(DummyReviewableView.diffTypeMismatchTemplate({
            errorText: interpolate(gettext("Unable to show a diff between \"%(caption)s\" (revision %(revision)s) and \"%(diffCaption)s\" (revision %(diffRevision)s) because the file types do not match."), {
              "caption": caption,
              "revision": revision,
              "diffCaption": diffCaption,
              "diffRevision": diffRevision
            }, true)
          }));
        }
      }

      /**
       * Callback for when a new file revision is selected.
       *
       * This supports single revisions and diffs. If 'base' is 0, a
       * single revision is selected, If not, the diff between `base` and
       * `tip` will be shown.
       *
       * Args:
       *     revisions (array of number):
       *         An array with two elements, representing the range of revisions
       *         to display.
       */
      #onRevisionSelected(revisions) {
        const [base, tip] = revisions;

        // Ignore clicks on No Diff Label.
        if (tip === 0) {
          return;
        }
        const revisionIDs = this.model.get('attachmentRevisionIDs');
        const revisionTip = revisionIDs[tip - 1];

        /*
         * Eventually these hard redirects will use a router
         * (see diffViewerPageView.js for example)
         * this.router.navigate(base + '-' + tip + '/', {trigger: true});
         */
        let redirectURL;
        if (base === 0) {
          redirectURL = `../${revisionTip}/`;
        } else {
          const revisionBase = revisionIDs[base - 1];
          redirectURL = `../${revisionBase}-${revisionTip}/`;
        }
        RB.navigateTo(redirectURL, {
          replace: true
        });
      }
    }) || _class$4;

    var _class$3;

    /** A structure to hold the region size for a selection. */

    /** Type for the callback when a drag occurs.*/

    /** Type for the function that returns the current selection region. */

    /**
     * Stored state when moving a region comment.
     */

    /**
     * Provides a visual region over an image or other document showing comments.
     *
     * This will show a selection rectangle over part of an image or other
     * content indicating there are comments there. It will also show the
     * number of comments, along with a tooltip showing comment summaries.
     *
     * This is meant to be used with a RegionCommentBlock model.
     *
     * Version Changed:
     *     7.0.2:
     *     Made the :js:attr:`$flag` and :js:attr:`$resizeIcon` attributes public.
     *
     *     7.0.1:
     *     Made the :js:attr:`scale` and :js:attr:`moveState` attributes public.
     */
    let RegionCommentBlockView = spina.spina(_class$3 = class RegionCommentBlockView extends AbstractCommentBlockView {
      static className = 'selection';
      static events = {
        'click': '_onClicked',
        'mousedown': '_onMouseDown',
        'touchend': '_onClicked'
      };
      static modelEvents = {
        'change:count': '_updateCount',
        'change:x change:y change:width change:height': '_updateBounds'
      };

      /**********************
       * Instance variables *
       **********************/

      /** The stored state when moving a region comment. */
      moveState = {
        dragCallback: _.noop,
        hasMoved: false,
        initialBounds: {},
        initialCursor: {}
      };

      /** The scale to adjust the stored region. */
      scale = 1.0;

      /** The selection flag. */
      $flag = null;

      /** The icon for resizing the comment region. */
      $resizeIcon = null;

      /** The JQuery-wrapped window object. */
      #$window = $(window);

      /** The function to get the selection region. */

      /**
       * Initialize RegionCommentBlockView.
       */
      initialize() {
        _.bindAll(this, '_onDrag', '_onWindowMouseUp');
      }

      /**
       * Un-listen to events.
       *
       * Returns:
       *     RegionCommentBlockView:
       *     This object, for chaining.
       */
      undelegateEvents() {
        super.undelegateEvents();
        this.#$window.off(`mousemove.${this.cid}`);
        return this;
      }

      /**
       * Set the selection region size function.
       *
       * This function is meant to return the maximum size of the selection
       * region for the given comment.
       *
       * Args:
       *     func (function):
       *         A function which will return a size object.
       */
      setSelectionRegionSizeFunc(func) {
        this._selectionRegionSizeFunc = func;
      }

      /**
       * Return the selection region size.
       *
       * Returns:
       *     object:
       *     An object with ``x``, ``y``, ``width``, and ``height`` fields, in
       *     pixels.
       */
      getSelectionRegionSize() {
        return _.result(this, '_selectionRegionSizeFunc');
      }

      /**
       * Initiate a drag operation.
       *
       * Args:
       *     left (number):
       *         The initial left position of the cursor.
       *
       *     top (number):
       *         The initial top position of the cursor.
       *
       *     callback (function):
       *         A callback function to call once the drag is finished.
       */
      _startDragging(left, top, callback) {
        /*
         * ``hasMoved`` is used to distinguish dragging from clicking.
         * ``initialCursor`` and ``initialBounds`` are used to calculate the
         * new position and size while dragging.
         */
        const moveState = this.moveState;
        moveState.hasMoved = false;
        moveState.initialCursor.left = left;
        moveState.initialCursor.top = top;
        moveState.initialBounds.left = this.$el.position().left;
        moveState.initialBounds.top = this.$el.position().top;
        moveState.initialBounds.width = this.$el.width();
        moveState.initialBounds.height = this.$el.height();
        moveState.dragCallback = callback;
        this.#$window.on(`mousemove.${this.cid}`, this._onDrag);
      }

      /**
       * End a drag operation.
       */
      _endDragging() {
        /*
         * Unset the dragging flag after the stack unwinds, so that the
         * click event can handle it properly.
         */
        _.defer(() => {
          this.moveState.hasMoved = false;
        });
        this.#$window.off(`mousemove.${this.cid}`);
      }

      /**
       * Move the comment region to a new position.
       *
       * Args:
       *     left (number):
       *         The new X-coordinate of the mouse at the end of the drag
       *         operation, relative to the page.
       *
       *     top (number):
       *         The new Y-coordinate of the mouse at the end of the drag
       *         operation, relative to the page.
       */
      _moveTo(left, top) {
        const scale = this.scale;
        const moveState = this.moveState;
        const region = this.getSelectionRegionSize();
        const maxLeft = region.width - this.model.get('width') * scale;
        const maxTop = region.height - this.model.get('height') * scale;
        const newLeft = moveState.initialBounds.left + left - moveState.initialCursor.left;
        const newTop = moveState.initialBounds.top + top - moveState.initialCursor.top;
        this.model.set({
          x: RB.MathUtils.clip(newLeft, 0, maxLeft) / scale,
          y: RB.MathUtils.clip(newTop, 0, maxTop) / scale
        });
      }

      /*
       * Resize (change with and height of) the comment block.
       *
       * Args:
       *     left (number):
       *         The new X-coordinate of the mouse at the end of the drag
       *         operation, relative to the page.
       *
       *     top (number):
       *         The new Y-coordinate of the mouse at the end of the drag
       *         operation, relative to the page.
       */
      _resizeTo(left, top) {
        const scale = this.scale;
        const moveState = this.moveState;
        const region = this.getSelectionRegionSize();
        const maxWidth = region.width - this.model.get('x') * scale;
        const maxHeight = region.height - this.model.get('y') * scale;
        const newWidth = moveState.initialBounds.width + left - moveState.initialCursor.left;
        const newHeight = moveState.initialBounds.height + top - moveState.initialCursor.top;
        this.model.set({
          height: RB.MathUtils.clip(newHeight, 0, maxHeight) / scale,
          width: RB.MathUtils.clip(newWidth, 0, maxWidth) / scale
        });
      }

      /**
       * Handle a mousedown event.
       *
       * Mouse-down means one of these in this view:
       * 1. click
       * 2. start of dragging to move the comment
       * 3. start of dragging to resize the comment
       *
       * This method looks at ``e.target`` and does the appropriate action.
       *
       * Args:
       *     e (Event):
       *         The event which triggered the callback.
       */
      _onMouseDown(e) {
        if (this.model.canUpdateBounds()) {
          e.preventDefault();
          e.stopPropagation();
          let draggingCallback = null;
          if (e.target === this.$flag.get(0)) {
            draggingCallback = this._moveTo;
          } else if (e.target === this.$resizeIcon.get(0)) {
            draggingCallback = this._resizeTo;
          }
          if (draggingCallback) {
            this._startDragging(e.pageX, e.pageY, draggingCallback);
            $(window).one('mouseup', this._onWindowMouseUp);
          }
        }
      }

      /**
       * Handle a mouseup event.
       *
       * If something has been dragged, end dragging and update the comment's
       * bounds.
       *
       * If not, the event was actually a ``click`` event and we call the
       * superclass' click handler.
       */
      _onWindowMouseUp() {
        if (this.moveState.hasMoved) {
          this.model.saveDraftCommentBounds();
        }
        this._endDragging();
      }

      /**
       * Handle a drag event.
       *
       * Set moveState.hasMoved to ``true`` to prevent triggering a ``click``
       * event, and move to view to dragged location.
       *
       * Args:
       *     e (Event):
       *         The event which triggered the callback.
       */
      _onDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        this.hideTooltip();
        this.moveState.hasMoved = true;
        this.moveState.dragCallback.call(this, e.pageX, e.pageY);
      }

      /**
       * Render the comment block.
       *
       * Along with the block's rectangle, a floating tooltip will also be
       * created that displays summaries of the comments.
       */
      renderContent() {
        this._updateBounds();
        if (this.model.canUpdateBounds()) {
          this.$el.addClass('can-update-bound');
          this.$resizeIcon = $('<div class="resize-icon">').appendTo(this.$el);
        }
        this.$flag = $('<div class="selection-flag">').appendTo(this.$el);
        this._updateCount();
      }

      /**
       * Position the comment dialog to the side of the flag.
       *
       * Args:
       *     commentDlg (RB.CommentDialogView):
       *         The comment dialog.
       */
      positionCommentDlg(commentDlg) {
        commentDlg.positionBeside(this.$flag, {
          fitOnScreen: true,
          side: 'b'
        });
      }

      /**
       * Update the position and size of the comment block element.
       *
       * The new position and size will reflect the x, y, width, and height
       * properties in the model.
       */
      _updateBounds() {
        const scale = this.scale;
        this.$el.move(this.model.get('x') * scale, this.model.get('y') * scale, 'absolute').width(this.model.get('width') * scale).height(this.model.get('height') * scale);
      }

      /**
       * Update the displayed count of comments.
       */
      _updateCount() {
        if (this.$flag) {
          this.$flag.text(this.model.get('count'));
        }
      }

      /**
       * Handle a click event.
       *
       * If the click event is not the end result of a drag operation, this
       * will emit the "clicked" event on the view.
       */
      _onClicked() {
        if (!this.moveState.hasMoved) {
          this.trigger('clicked');
        }
      }

      /**
       * Set the zoom scale.
       *
       * Args:
       *     scale (number):
       *         A scaling factor. 1.0 is a 1:1 pixel ratio, 0.5 is displayed
       *         at half size, etc.
       */
      setScale(scale) {
        this.scale = scale;
        this._updateBounds();
      }
    }) || _class$3;

    var _dec, _class$2, _class2, _class3, _class4, _class5, _class6, _class7;

    /**
     * A mapping of available image scaling factors to the associated label.
     */
    const scalingFactors = new Map([[0.33, '33%'], [0.5, '50%'], [1.0, '100%'], [2.0, '200%']]);

    /**
     * An object to hold the size of an image.
     *
     * Version Added:
     *     7.0
     */
    /**
     * Base class for providing a view onto an image or diff of images.
     *
     * This handles the common functionality, such as loading images, determining
     * the image region, rendering, and so on.
     *
     * Subclasses must, at a minimum, provide a 'mode', 'modeName', and must set
     * $commentRegion to an element representing the region where comments are
     * allowed.
     */
    let BaseImageView = (_dec = spina.spina({
      prototypeAttrs: ['mode', 'modeName']
    }), _dec(_class$2 = class BaseImageView extends spina.BaseView {
      /**
       * The name of the diff mode, used in element IDs.
       *
       * This should be overridden by subclasses.
       */
      static mode = null;

      /**
       * The user-visible name of the diff mode.
       *
       * This should be overridden by subclasses.
       */
      static modeName = null;

      /**********************
       * Instance variables *
       **********************/

      /** The current comment region. */

      /** The image elements. */

      /**
       * Initialize the view.
       */
      initialize() {
        this.$commentRegion = null;
        this.listenTo(this.model, 'change:scale', (model, scale) => this._onScaleChanged(scale));
      }

      /**
       * Return the CSS class name for this view.
       *
       * Returns:
       *     string:
       *     A class name based on the current mode.
       */
      static className() {
        return `image-diff-${this.mode}`;
      }

      /**
       * Load a list of images.
       *
       * Once each image is loaded, the view's _onImagesLoaded function will
       * be called. Subclasses can override this to provide functionality based
       * on image sizes and content.
       *
       * Args:
       *     $images (jQuery):
       *         The image elements to load.
       */
      loadImages($images) {
        const scale = this.model.get('scale');
        let loadsRemaining = $images.length;
        this._$images = $images;
        $images.each((ix, image) => {
          const $image = $(image);
          if ($image.data('initial-width') === undefined) {
            image.onload = () => {
              loadsRemaining--;
              console.assert(loadsRemaining >= 0);
              $image.data({
                'initial-height': image.height,
                'initial-width': image.width
              }).css({
                height: image.height * scale,
                width: image.width * scale
              });
              if (loadsRemaining === 0) {
                _.defer(() => {
                  this._onImagesLoaded();
                  this.trigger('regionChanged');
                });
              }
            };
          } else {
            loadsRemaining--;
            if (loadsRemaining === 0) {
              this._onImagesLoaded();
              this.trigger('regionChanged');
            }
          }
        });
      }

      /**
       * Return the region of the view where commenting can take place.
       *
       * The region is based on the $commentRegion member variable, which must
       * be set by a subclass.
       *
       * Returns:
       *     object:
       *     An object with ``left``, ``top``, ``width``, and ``height`` keys.
       */
      getSelectionRegion() {
        const $region = this.$commentRegion;
        const offset = $region.position();

        /*
         * The margin: 0 auto means that position.left() will return
         * the left-most part of the entire block, rather than the actual
         * position of the region on Chrome. Every other browser returns 0
         * for this margin, as we'd expect. So, just play it safe and
         * offset by the margin-left. (Bug #1050)
         */
        offset.left += $region.getExtents('m', 'l');
        return {
          height: $region.height(),
          left: offset.left,
          top: offset.top,
          width: $region.width()
        };
      }

      /**
       * Callback handler for when the images on the view are loaded.
       *
       * Subclasses that override this method must call the base method so that
       * images can be scaled appropriately.
       */
      _onImagesLoaded() {
        let scale = null;

        /*
         * If the image is obviously a 2x or 3x pixel ratio, pre-select the
         * right scaling factor.
         *
         * Otherwise, we select the largest scaling factor that allows the
         * entire image to be shown (or the smallest scaling factor if the
         * scaled image is still too large).
         */
        const filename = this.model.get('filename');

        /*
         * The `filename` attribute does not exist for screenshots, so we need
         * to check it.
         */
        if (filename) {
          if (filename.includes('@2x.')) {
            scale = 0.5;
          } else if (filename.includes('@3x.')) {
            scale = 0.33;
          }
        }
        if (scale === null) {
          const {
            width
          } = this.getInitialSize();
          const maxWidth = this.$el.closest('.image-content').width();
          const scales = Array.from(scalingFactors.keys()).filter(f => f <= 1);
          for (let i = scales.length - 1; i >= 0; i--) {
            scale = scales[i];
            if (width * scale <= maxWidth) {
              break;
            }
          }
        }
        this.model.set('scale', scale);
      }

      /**
       * Handle the image scale being changed.
       *
       * Args:
       *     scale (number):
       *         The new image scaling factor (where 1.0 is 100%, 0.5 is 50%,
       *         etc).
       */
      _onScaleChanged(scale) {
        this._$images.each((index, el) => {
          const $image = $(el);
          $image.css({
            height: $image.data('initial-height') * scale,
            width: $image.data('initial-width') * scale
          });
        });
      }

      /**
       * Return the initial size of the image.
       *
       * Subclasses must override this.
       *
       * Returns:
       *     object:
       *     An object containing the initial height and width of the image.
       */
      getInitialSize() {
        console.assert(false, 'subclass of BaseImageView must implement getInitialSize');
        return null;
      }
    }) || _class$2);
    /**
     * Displays a single image.
     *
     * This view is used for standalone images, without diffs. It displays the
     * image and allows it to be commented on.
     */
    let ImageAttachmentView = spina.spina(_class2 = class ImageAttachmentView extends BaseImageView {
      static mode = 'attachment';
      static tagName = 'img';

      /**
       * Render the view.
       */
      onInitialRender() {
        this.$el.attr({
          src: this.model.get('imageURL'),
          title: this.model.get('caption')
        });
        this.$commentRegion = this.$el;
        this.loadImages(this.$el);
      }

      /**
       * Return the initial size of the image.
       *
       * Subclasses must override this.
       *
       * Returns:
       *     object:
       *     An object containing the initial height and width of the image.
       */
      getInitialSize() {
        const $img = this._$images.eq(0);
        return {
          height: $img.data('initial-height'),
          width: $img.data('initial-width')
        };
      }
    }) || _class2;
    /**
     * Displays a color difference view of two images.
     *
     * Each pixel in common between images will be shown in black. Added pixels
     * in the new image are shown as they would in the image itself. Differences
     * in pixel values are shown as well.
     *
     * See:
     * http://jeffkreeftmeijer.com/2011/comparing-images-and-creating-image-diffs/
     */
    let ImageDifferenceDiffView = spina.spina(_class3 = class ImageDifferenceDiffView extends BaseImageView {
      static mode = 'difference';
      static modeName = gettext("Difference");
      static template = _.template(`<div class="image-container">
 <canvas></canvas>
</div>`);

      /**********************
       * Instance variables *
       **********************/

      /** The canvas used for drawing the difference. */
      #$canvas;

      /** The (hidden) original image element. */
      #origImage = null;

      /** The maximum height of the original and modified images. */
      #maxHeight;

      /** The maximum width of the original and modified images. */
      #maxWidth;

      /** The (hidden) modified image element. */
      #modifiedImage = null;

      /**
       * Render the view.
       *
       * Image elements representing the original and modified images will be
       * created and loaded. After loading, _onImagesLoaded will handle
       * populating the canvas with the difference view.
       */
      onInitialRender() {
        this.$el.html(ImageDifferenceDiffView.template(this.model.attributes));
        this.$commentRegion = this.$('canvas');
        this.#$canvas = this.$commentRegion;
        this.#origImage = new Image();
        this.#origImage.src = this.model.get('diffAgainstImageURL');
        this.#modifiedImage = new Image();
        this.#modifiedImage.src = this.model.get('imageURL');
        this.loadImages($([this.#origImage, this.#modifiedImage]));
      }

      /**
       * Render the difference between two images onto the canvas.
       */
      _onImagesLoaded() {
        const origImage = this.#origImage;
        const modifiedImage = this.#modifiedImage;
        const scale = this.model.get('scale');
        this.#maxWidth = Math.max(origImage.width, modifiedImage.width);
        this.#maxHeight = Math.max(origImage.height, modifiedImage.height);
        super._onImagesLoaded();
        this.#$canvas.attr({
          height: this.#maxHeight,
          width: this.#maxWidth
        }).css({
          height: this.#maxHeight * scale + 'px',
          width: this.#maxWidth * scale + 'px'
        });
        const $modifiedCanvas = $('<canvas>').attr({
          height: this.#maxHeight,
          width: this.#maxWidth
        });
        const origContext = this.#$canvas[0].getContext('2d');
        origContext.drawImage(origImage, 0, 0);
        const modifiedContext = $modifiedCanvas[0].getContext('2d');
        modifiedContext.drawImage(modifiedImage, 0, 0);
        const origImageData = origContext.getImageData(0, 0, this.#maxWidth, this.#maxHeight);
        const origPixels = origImageData.data;
        const modifiedPixels = modifiedContext.getImageData(0, 0, this.#maxWidth, this.#maxHeight).data;
        for (let i = 0; i < origPixels.length; i += 4) {
          origPixels[i] += modifiedPixels[i] - 2 * Math.min(origPixels[i], modifiedPixels[i]);
          origPixels[i + 1] += modifiedPixels[i + 1] - 2 * Math.min(origPixels[i + 1], modifiedPixels[i + 1]);
          origPixels[i + 2] += modifiedPixels[i + 2] - 2 * Math.min(origPixels[i + 2], modifiedPixels[i + 2]);
          origPixels[i + 3] = modifiedPixels[i + 3];
        }
        origContext.putImageData(origImageData, 0, 0);
      }

      /**
       * Handle the image scale being changed.
       *
       * Args:
       *     scale (number):
       *         The new image scaling factor (where 1.0 is 100%, 0.5 is 50%,
       *         etc).
       */
      _onScaleChanged(scale) {
        this.#$canvas.css({
          height: this.#maxHeight * scale + 'px',
          width: this.#maxWidth * scale + 'px'
        });
      }

      /**
       * Return the initial size of the image.
       *
       * Returns:
       *     object:
       *     An object containing the initial height and width of the image.
       */
      getInitialSize() {
        return {
          height: this.#maxHeight,
          width: this.#maxWidth
        };
      }
    }) || _class3;
    /**
     * Displays an onion skin view of two images.
     *
     * Onion skinning allows the user to see subtle changes in two images by
     * altering the transparency of the modified image. Through a slider, they'll
     * be able to play around with the transparency and see if any pixels move,
     * disappear, or otherwise change.
     */
    let ImageOnionDiffView = spina.spina(_class4 = class ImageOnionDiffView extends BaseImageView {
      static mode = 'onion';
      static modeName = gettext("Onion Skin");
      static template = _.template(`<div class="image-containers">
 <div class="orig-image">
  <img title="<%- caption %>" src="<%- diffAgainstImageURL %>">
 </div>
 <div class="modified-image">
  <img title="<%- caption %>" src="<%- imageURL %>">
 </div>
</div>
<div class="image-slider"></div>`);
      static DEFAULT_OPACITY = 0.25;

      /**********************
       * Instance variables *
       **********************/

      /** The modified image. */
      #$modifiedImage = null;

      /** The container element for the modified image. */
      #$modifiedImageContainer = null;

      /** The original image. */
      #$origImage = null;

      /**
       * Render the view.
       *
       * This will set up the slider and set it to a default of 25% opacity.
       *
       * Returns:
       *     ImageOnionDiffView:
       *     This object, for chaining.
       */
      onInitialRender() {
        this.$el.html(ImageOnionDiffView.template(this.model.attributes));
        this.$commentRegion = this.$('.image-containers');
        this.#$origImage = this.$('.orig-image img');
        this.#$modifiedImage = this.$('.modified-image img');
        this.#$modifiedImageContainer = this.#$modifiedImage.parent();
        this.$('.image-slider').slider({
          slide: (e, ui) => this.setOpacity(ui.value / 100.0),
          value: ImageOnionDiffView.DEFAULT_OPACITY * 100
        });
        this.setOpacity(ImageOnionDiffView.DEFAULT_OPACITY);
        this.loadImages(this.$('img'));
      }

      /**
       * Set the opacity value for the images.
       *
       * Args:
       *     percentage (number):
       *         The opacity percentage, in [0.0, 1.0].
       */
      setOpacity(percentage) {
        this.#$modifiedImageContainer.css('opacity', percentage);
      }

      /**
       * Position the images after they load.
       *
       * The images will be layered on top of each other, consuming the
       * same width and height.
       */
      _onImagesLoaded() {
        super._onImagesLoaded();
        this._resize();
      }

      /**
       * Handle the image scale being changed.
       *
       * Args:
       *     scale (number):
       *         The new image scaling factor (where 1.0 is 100%, 0.5 is 50%,
       *         etc).
       */
      _onScaleChanged(scale) {
        super._onScaleChanged(scale);
        this._resize();
      }

      /**
       * Resize the image containers.
       */
      _resize() {
        const scale = this.model.get('scale');
        const origW = this.#$origImage.data('initial-width') * scale;
        const origH = this.#$origImage.data('initial-height') * scale;
        const newW = this.#$modifiedImage.data('initial-width') * scale;
        const newH = this.#$modifiedImage.data('initial-height') * scale;
        this.#$origImage.parent().width(origW).height(origH);
        this.#$modifiedImage.parent().width(newW).height(newH);
        this.$('.image-containers').width(Math.max(origW, newW)).height(Math.max(origH, newH));
      }

      /**
       * Return the initial size of the image.
       *
       * Returns:
       *     object:
       *     An object containing the initial height and width of the image.
       */
      getInitialSize() {
        return {
          height: Math.max(this.#$origImage.data('initial-height'), this.#$modifiedImage.data('initial-height')),
          width: Math.max(this.#$origImage.data('initial-width'), this.#$modifiedImage.data('initial-width'))
        };
      }
    }) || _class4;
    /**
     * Displays an overlapping split view between two images.
     *
     * The images will be overlapping, and a horizontal slider will control how
     * much of the modified image is shown. The modified image will overlap the
     * original image. This makes it easy to compare the two images incrementally.
     */
    let ImageSplitDiffView = spina.spina(_class5 = class ImageSplitDiffView extends BaseImageView {
      static mode = 'split';
      static modeName = gettext("Split");
      static template = _.template(`<div class="image-containers">
 <div class="image-diff-split-container-orig">
  <div class="orig-image">
   <img title="<%- caption %>" src="<%- diffAgainstImageURL %>">
  </div>
 </div>
 <div class="image-diff-split-container-modified">
  <div class="modified-image">
   <img title="<%- caption %>" src="<%- imageURL %>">
  </div>
 </div>
</div>
<div class="image-slider"></div>`);

      /** The default slider position of 25%. */
      static DEFAULT_SPLIT_PCT = 0.25;

      /**********************
       * Instance variables *
       **********************/

      /** The modified image. */
      #$modifiedImage = null;

      /** The container for the modified image. */
      #$modifiedSplitContainer = null;

      /** The original image. */
      #$origImage = null;

      /** The container for the original image. */
      #$origSplitContainer = null;

      /** The slider element. */
      #$slider = null;

      /** The maximum height of the original and modified images. */
      #maxHeight = 0;

      /** The maximum width of the original and modified images. */
      #maxWidth = 0;

      /**
       * Render the view.
       */
      onInitialRender() {
        this.$el.html(ImageSplitDiffView.template(this.model.attributes));
        this.$commentRegion = this.$('.image-containers');
        this.#$origImage = this.$('.orig-image img');
        this.#$modifiedImage = this.$('.modified-image img');
        this.#$origSplitContainer = this.$('.image-diff-split-container-orig');
        this.#$modifiedSplitContainer = this.$('.image-diff-split-container-modified');
        this.#$slider = this.$('.image-slider').slider({
          slide: (e, ui) => this.setSplitPercentage(ui.value / 100.0),
          value: ImageSplitDiffView.DEFAULT_SPLIT_PCT * 100
        });
        this.loadImages(this.$('img'));
        return this;
      }

      /**
       * Set the percentage for the split view.
       *
       * Args:
       *     percentage (number):
       *         The position of the slider, in [0.0, 1.0].
       */
      setSplitPercentage(percentage) {
        this.#$origSplitContainer.outerWidth(this.#maxWidth * percentage);
        this.#$modifiedSplitContainer.outerWidth(this.#maxWidth * (1.0 - percentage));
      }

      /**
       * Position the images after they load.
       *
       * The images will be layered on top of each other, anchored to the
       * top-left.
       *
       * The slider will match the width of the two images, in order to
       * position the slider's handle with the divider between images.
       */
      _onImagesLoaded() {
        super._onImagesLoaded();
        this._resize();
      }

      /**
       * Handle the image scale being changed.
       *
       * Args:
       *     scale (number):
       *         The new image scaling factor (where 1.0 is 100%, 0.5 is 50%,
       *         etc).
       */
      _onScaleChanged(scale) {
        super._onScaleChanged(scale);
        this._resize();
      }

      /**
       * Resize the image containers.
       */
      _resize() {
        const $origImageContainer = this.#$origImage.parent();
        const scale = this.model.get('scale');
        const origW = this.#$origImage.data('initial-width') * scale;
        const origH = this.#$origImage.data('initial-height') * scale;
        const newW = this.#$modifiedImage.data('initial-width') * scale;
        const newH = this.#$modifiedImage.data('initial-height') * scale;
        const maxH = Math.max(origH, newH);
        const maxOuterH = maxH + $origImageContainer.getExtents('b', 'tb');
        this.#maxWidth = Math.max(origW, newW);
        this.#maxHeight = Math.max(origH, newH);
        $origImageContainer.outerWidth(origW).height(origH);
        this.#$modifiedImage.parent().outerWidth(newW).height(newH);
        this.#$origSplitContainer.outerWidth(this.#maxWidth).height(maxOuterH);
        this.#$modifiedSplitContainer.outerWidth(this.#maxWidth).height(maxOuterH);
        this.$('.image-containers').width(this.#maxWidth).height(maxH);
        this.#$slider.width(this.#maxWidth);

        /* Now that these are loaded, set the default for the split. */
        this.setSplitPercentage(ImageSplitDiffView.DEFAULT_SPLIT_PCT);
      }

      /**
       * Return the initial size of the image.
       *
       * Returns:
       *     object:
       *     An object containing the initial height and width of the image.
       */
      getInitialSize() {
        return {
          height: this.#maxHeight,
          width: this.#maxWidth
        };
      }
    }) || _class5;
    /**
     * Displays a two-up, side-by-side view of two images.
     *
     * The images will be displayed horizontally, side-by-side. Comments will
     * only be able to be added against the new file.
     */
    let ImageTwoUpDiffView = spina.spina(_class6 = class ImageTwoUpDiffView extends BaseImageView {
      static mode = 'two-up';
      static modeName = gettext("Two-Up");
      static template = _.template(`<div class="image-container image-container-orig">
 <div class="orig-image">
  <img title="<%- caption %>" src="<%- diffAgainstImageURL %>">
 </div>
</div>
<div class="image-container image-container-modified">
 <div class="modified-image">
  <img title="<%- caption %>" src="<%- imageURL %>">
 </div>
</div>`);

      /**********************
       * Instance variables *
       **********************/

      /** The original image. */
      #$origImage = null;

      /** The modified image. */
      #$modifiedImage = null;

      /**
       * Render the view.
       */
      onInitialRender() {
        this.$el.html(ImageTwoUpDiffView.template(this.model.attributes));
        this.$commentRegion = this.$('.modified-image img');
        this.#$origImage = this.$('.orig-image img');
        this.#$modifiedImage = this.$('.modified-image img');
        this.loadImages(this.$('img'));
      }

      /**
       * Return the initial size of the image.
       *
       * Returns:
       *     object:
       *     An object containing the initial height and width of the image.
       */
      getInitialSize() {
        return {
          height: Math.max(this.#$origImage.data('initial-height'), this.#$modifiedImage.data('initial-height')),
          width: Math.max(this.#$origImage.data('initial-width'), this.#$modifiedImage.data('initial-width'))
        };
      }
    }) || _class6;
    /** An object for holding information about the current selection. */
    /**
     * Displays a review UI for images.
     *
     * This supports reviewing individual images, and diffs between images.
     *
     * In the case of individual images, the image will be displayed, centered,
     * and all existing comments will be shown as selection boxes on top of it.
     * Users can click and drag across part of the image to leave a comment on
     * that area.
     *
     * Image diffs can be shown in multiple modes. This supports a "two-up"
     * side-by-side view, an overlapping split view, Onion Skinning view, and
     * a color difference view.
     */
    let ImageReviewableView = spina.spina(_class7 = class ImageReviewableView extends FileAttachmentReviewableView {
      static className = 'image-review-ui';
      static commentBlockView = RegionCommentBlockView;
      static events = {
        'click .image-diff-modes .rb-c-tabs__tab': '_onImageModeClicked',
        'mousedown .selection-container': '_onMouseDown',
        'mousemove .selection-container': '_onMouseMove',
        'mouseup .selection-container': '_onMouseUp'
      };
      static captionTableTemplate = _.template('<table><tr><%= items %></tr></table>');
      static captionItemTemplate = _.template(`<td>
 <h1 class="caption">
  <%- caption %>
 </h1>
</td>`);
      static errorTemplate = _.template(`<div class="review-ui-error">
 <div class="rb-icon rb-icon-warning"></div>
 <%- errorStr %>
</div>`);
      static ANIM_SPEED_MS = 200;

      /**********************
       * Instance variables *
       **********************/

      /** The container for all of the diff views. */
      #$imageDiffs;

      /** The UI for choosing the diff mode. */
      #$modeBar = null;

      /** The selection area container. */
      #$selectionArea;

      /** The selection box . */
      #$selectionRect;

      /** The active selection. */
      #activeSelection = {};

      /** The block views for all existing comments. */
      #commentBlockViews = [];

      /** The views for the different diff modes. */
      #diffModeViews = {};

      /** The menu elements for the different diff modes. */
      #diffModeSelectors = {};

      /** The basic image view. */
      #imageView = null;

      /**
       * The image zoom level drop-down menu.
       *
       * Version Added:
       *     7.0
       */
      #imageZoomLevelMenuLabelView = null;

      /**
       * Initialize the view.
       */
      initialize(options = {}) {
        super.initialize(options);
        _.bindAll(this, '_adjustPos');

        /*
         * Add any CommentBlockViews to the selection area when they're
         * created.
         */
        this.on('commentBlockViewAdded', commentBlockView => {
          commentBlockView.setSelectionRegionSizeFunc(() => _.pick(this.#imageView.getSelectionRegion(), 'width', 'height'));
          commentBlockView.setScale(this.model.get('scale'));
          this.#$selectionArea.append(commentBlockView.$el);
          this.#commentBlockViews.push(commentBlockView);
          this.listenTo(commentBlockView, 'removing', () => {
            this.#commentBlockViews = _.without(this.#commentBlockViews, commentBlockView);
          });
        });
        this.listenTo(this.model, 'change:scale', (model, scale) => {
          this.#commentBlockViews.forEach(view => view.setScale(scale));
          this.#imageZoomLevelMenuLabelView.text = scalingFactors.get(scale);

          /*
           * We must wait for the image views to finish scaling themselves,
           * otherwise the comment blocks will be in incorrect places.
           */
          _.defer(this._adjustPos);
        });
      }

      /**
       * Render the view.
       *
       * This will set up a selection area over the image and create a
       * selection rectangle that will be shown when dragging.
       *
       * Any time the window resizes, the comment positions will be adjusted.
       */
      renderContent() {
        const model = this.model;
        const hasDiff = !!model.get('diffAgainstFileAttachmentID');
        const $header = $('<div>').addClass('review-ui-header').prependTo(this.$el);
        this.#$selectionArea = $('<div>').addClass('selection-container').hide().proxyTouchEvents();
        this.#$selectionRect = $('<div>').addClass('selection-rect').prependTo(this.#$selectionArea).proxyTouchEvents().hide();

        /*
         * Register a hover event to hide the comments when the mouse
         * is not over the comment area.
         */
        this.$el.hover(() => {
          this.#$selectionArea.show();
          this._adjustPos();
        }, () => {
          if (this.#$selectionRect.is(':hidden') && !this.commentDlg) {
            this.#$selectionArea.hide();
          }
        });
        const $wrapper = $('<div class="image-content">').append(this.#$selectionArea);
        if (model.get('diffTypeMismatch')) {
          this.$el.append(ImageReviewableView.errorTemplate({
            errorStr: gettext("These revisions cannot be compared because they are different file types.")
          }));
        } else if (hasDiff) {
          this.#$modeBar = $('<ul class="rb-c-tabs image-diff-modes -has-modes">');
          this.#$imageDiffs = $('<div class="image-diffs">');
          this._addDiffMode(ImageTwoUpDiffView);
          this._addDiffMode(ImageDifferenceDiffView);
          this._addDiffMode(ImageSplitDiffView);
          this._addDiffMode(ImageOnionDiffView);
          $wrapper.append(this.#$imageDiffs).appendTo(this.$el);
          this._setDiffMode(ImageTwoUpDiffView.mode);
        } else {
          if (this.renderedInline) {
            this.#$modeBar = $('<ul class="rb-c-tabs image-diff-modes">');
          }
          this.#imageView = new ImageAttachmentView({
            model: model
          });
          $wrapper.append(this.#imageView.$el).appendTo(this.$el);
          this.#imageView.render();
        }

        /*
         * Reposition the selection area on page resize or loaded, so that
         * comments are in the right locations.
         */
        $(window).on({
          'load': this._adjustPos,
          'resize': this._adjustPos
        });
        if (model.get('numRevisions') > 1) {
          const $revisionLabel = $('<div id="revision_label">').appendTo($header);
          const revisionLabelView = new RB.FileAttachmentRevisionLabelView({
            el: $revisionLabel,
            model: model
          });
          revisionLabelView.render();
          this.listenTo(revisionLabelView, 'revisionSelected', this._onRevisionSelected);
          const $revisionSelector = $('<div id="attachment_revision_selector">').appendTo($header);
          const revisionSelectorView = new RB.FileAttachmentRevisionSelectorView({
            el: $revisionSelector,
            model: model
          });
          revisionSelectorView.render();
          this.listenTo(revisionSelectorView, 'revisionSelected', this._onRevisionSelected);
          if (!this.renderedInline) {
            if (hasDiff) {
              const caption = model.get('caption');
              const revision = model.get('fileRevision');
              const diffCaption = model.get('diffCaption');
              const diffRevision = model.get('diffRevision');
              const captionItems = [ImageReviewableView.captionItemTemplate({
                caption: interpolate(gettext("%(diffCaption)s (revision %(diffRevision)s)"), {
                  "diffCaption": diffCaption,
                  "diffRevision": diffRevision
                }, true)
              }), ImageReviewableView.captionItemTemplate({
                caption: interpolate(gettext("%(caption)s (revision %(revision)s)"), {
                  "caption": caption,
                  "revision": revision
                }, true)
              })];
              $header.append(ImageReviewableView.captionTableTemplate({
                items: captionItems.join('')
              }));
            } else {
              const $captionBar = $('<div class="image-single-revision">').appendTo($header);
              const caption = model.get('caption');
              const revision = model.get('fileRevision');
              $('<h1 class="caption">').text(interpolate(gettext("%(caption)s (revision %(revision)s)"), {
                "caption": caption,
                "revision": revision
              }, true)).appendTo($captionBar);
            }
          }
        } else {
          if (!this.renderedInline) {
            $header.addClass('image-single-revision');
            $('<h1 class="caption">').text(model.get('caption')).appendTo($header);
          }
        }
        const imageZoomLevelMenuLabelView = ink.craftComponent("Ink.MenuLabel", {
          "class": "image-resolution-menu",
          iconName: "ink-i-zoom-in",
          text: "100%"
        }, Array.from(scalingFactors.entries(), ([scale, text]) => ink.craftComponent("Ink.MenuLabel.Item", {
          onClick: () => model.set('scale', scale)
        }, text)));
        this.#imageZoomLevelMenuLabelView = imageZoomLevelMenuLabelView;
        if (this.#$modeBar !== null) {
          this.#$modeBar.append(ink.paintComponent("li", {
            "class": "image-resolution-menu-wrapper"
          }, imageZoomLevelMenuLabelView.el)).appendTo($header);
        } else {
          this.$('.caption').after(imageZoomLevelMenuLabelView.el);
        }
      }

      /**
       * Callback for when a new file revision is selected.
       *
       * This supports single revisions and diffs. If 'base' is 0, a
       * single revision is selected, If not, the diff between `base` and
       * `tip` will be shown.
       *
       * Args:
       *     revisions (Array of number):
       *         A two-element array of [base, tip] revisions.
       */
      _onRevisionSelected(revisions) {
        const revisionIDs = this.model.get('attachmentRevisionIDs');
        const [base, tip] = revisions;

        // Ignore clicks on No Diff Label
        if (tip === 0) {
          return;
        }

        /*
         * Eventually these hard redirects will use a router
         * (see diffViewerPageView.js for example)
         * this.router.navigate(base + '-' + tip + '/', {trigger: true});
         */
        const revisionTip = revisionIDs[tip - 1];
        let redirectURL;
        if (base === 0) {
          redirectURL = `../${revisionTip}/`;
        } else {
          const revisionBase = revisionIDs[base - 1];
          redirectURL = `../${revisionBase}-${revisionTip}/`;
        }
        RB.navigateTo(redirectURL, {
          replace: true
        });
      }

      /**
       * Register a diff mode.
       *
       * This will register a class for the mode and add an entry to the
       * mode bar.
       *
       * Args:
       *     ViewClass (function):
       *         The constructor for the view class.
       */
      _addDiffMode(ViewClass) {
        const mode = ViewClass.prototype.mode;
        const view = new ViewClass({
          model: this.model
        });
        this.#diffModeViews[mode] = view;
        view.$el.hide();
        this.#$imageDiffs.append(view.$el);
        view.render();
        this.#diffModeSelectors[mode] = $(ink.paintComponent("li", {
          "class": "rb-c-tabs__tab",
          "data-mode": mode
        }, ink.paintComponent("label", {
          "class": "rb-c-tabs__tab-label"
        }, view.modeName))).appendTo(this.#$modeBar);
      }

      /**
       * Set the current diff mode.
       *
       * That mode will be displayed on the page and comments will be shown.
       *
       * The height of the review UI will animate to the new height for this
       * mode.
       *
       * Args:
       *     mode (string):
       *         The new diff mode.
       */
      _setDiffMode(mode) {
        const newView = this.#diffModeViews[mode];
        if (this.#imageView) {
          this.#diffModeSelectors[this.#imageView.mode].removeClass('-is-active');
          newView.$el.show();
          const height = newView.$el.height();
          newView.$el.hide();
          this.#$imageDiffs.animate({
            duration: ImageReviewableView.ANIM_SPEED_MS,
            height: height
          });
          this.#$selectionArea.fadeOut(ImageReviewableView.ANIM_SPEED_MS);
          this.#imageView.$el.fadeOut(ImageReviewableView.ANIM_SPEED_MS, () => this._showDiffMode(newView, true));
        } else {
          this._showDiffMode(newView);
        }
        this.#diffModeSelectors[newView.mode].addClass('-is-active');
      }

      /**
       * Show the diff mode.
       *
       * This is called by _setDiffMode when it's ready to actually show the
       * new mode.
       *
       * The new mode will be faded in, if we're animating, or immediately shown
       * otherwise.
       *
       * Args:
       *     newView (Backbone.View):
       *         The new view to show.
       *
       *     animate (boolean):
       *         Whether to animate the transition.
       */
      _showDiffMode(newView, animate) {
        if (this.#imageView) {
          this.stopListening(this.#imageView, 'regionChanged');
        }
        this.#imageView = newView;
        if (animate) {
          this.#imageView.$el.fadeIn(ImageReviewableView.ANIM_SPEED_MS);
          this.#$selectionArea.fadeIn(ImageReviewableView.ANIM_SPEED_MS);
        } else {
          this.#imageView.$el.show();
          this.#$selectionArea.show();
        }
        this.listenTo(this.#imageView, 'regionChanged', this._adjustPos);
        this._adjustPos();
      }

      /**
       * Handler for when a mode in the diff mode bar is clicked.
       *
       * Sets the diff view to the given mode.
       *
       * Args:
       *     e (Event):
       *         The event which triggered the callback.
       */
      _onImageModeClicked(e) {
        e.preventDefault();
        e.stopPropagation();
        const tabEl = e.target.closest('.rb-c-tabs__tab');
        this._setDiffMode(tabEl.dataset.mode);
      }

      /**
       * Handle a mousedown on the selection area.
       *
       * If this is the first mouse button, and it's not being placed on
       * an existing comment block, then this will begin the creation of a new
       * comment block starting at the mousedown coordinates.
       *
       * Args:
       *     e (Event):
       *         The event which triggered the callback.
       */
      _onMouseDown(e) {
        if (e.which === 1 && !this.commentDlg && !$(e.target).hasClass('selection-flag')) {
          const offset = this.#$selectionArea.offset();
          this.#activeSelection.beginX = e.pageX - Math.floor(offset.left) - 1;
          this.#activeSelection.beginY = e.pageY - Math.floor(offset.top) - 1;
          const updateData = {
            height: 1,
            left: this.#activeSelection.beginX,
            top: this.#activeSelection.beginY,
            width: 1
          };
          this.#$selectionRect.css(updateData).data(updateData).show();
          if (this.#$selectionRect.is(':hidden')) {
            this.commentDlg.close();
          }
          e.stopPropagation();
          e.preventDefault();
        }
      }

      /**
       * Handle a mouseup on the selection area.
       *
       * This will finalize the creation of a comment block and pop up the
       * comment dialog.
       *
       * Args:
       *     e (Event):
       *         The event which triggered the callback.
       */
      _onMouseUp(e) {
        if (!this.commentDlg && this.#$selectionRect.is(':visible')) {
          e.stopPropagation();
          e.preventDefault();
          this.#$selectionRect.hide();

          /*
           * If we don't pass an arbitrary minimum size threshold,
           * don't do anything. This helps avoid making people mad
           * if they accidentally click on the image.
           */
          const position = this.#$selectionRect.data();
          const scale = this.model.get('scale');
          if (position.width > 5 && position.height > 5) {
            this.createAndEditCommentBlock({
              height: Math.floor(position.height / scale),
              width: Math.floor(position.width / scale),
              x: Math.floor(position.left / scale),
              y: Math.floor(position.top / scale)
            });
          }
        }
      }

      /**
       * Handle a mousemove on the selection area.
       *
       * If we're creating a comment block, this will update the
       * size/position of the block.
       *
       * Args:
       *     e (Event):
       *         The event which triggered the callback.
       */
      _onMouseMove(e) {
        if (!this.commentDlg && this.#$selectionRect.is(':visible')) {
          const offset = this.#$selectionArea.offset();
          const x = e.pageX - Math.floor(offset.left) - 1;
          const y = e.pageY - Math.floor(offset.top) - 1;
          const updateData = {};
          if (this.#activeSelection.beginX <= x) {
            updateData.left = this.#activeSelection.beginX;
            updateData.width = x - this.#activeSelection.beginX;
          } else {
            updateData.left = x;
            updateData.width = this.#activeSelection.beginX - x;
          }
          if (this.#activeSelection.beginY <= y) {
            updateData.top = this.#activeSelection.beginY;
            updateData.height = y - this.#activeSelection.beginY;
          } else {
            updateData.top = y;
            updateData.height = this.#activeSelection.beginY - y;
          }
          this.#$selectionRect.css(updateData).data(updateData);
          e.stopPropagation();
          e.preventDefault();
        }
      }

      /**
       * Reposition the selection area to the right locations.
       */
      _adjustPos() {
        const region = this.#imageView.getSelectionRegion();
        this.#$selectionArea.width(region.width).height(region.height).css({
          left: region.left,
          top: region.top
        });
        if (this.#$imageDiffs) {
          this.#$imageDiffs.height(this.#imageView.$el.height());
        }
      }
    }) || _class7;

    var _class$1;

    /**
     * Base for text-based review UIs.
     *
     * This will display all existing comments on an element by displaying a
     * comment indicator beside it. Users can place a comment by clicking on a
     * line, which will get a light-grey background color upon mouseover, and
     * placing a comment in the comment dialog that is displayed.
     */
    let TextBasedReviewableView = spina.spina(_class$1 = class TextBasedReviewableView extends FileAttachmentReviewableView {
      static commentBlockView = TextBasedCommentBlockView;

      /**********************
       * Instance variables *
       **********************/

      /** The router for loading different revisions. */

      /** The table for the rendered version of the document. */
      #$renderedTable = null;

      /** The table for the raw (source) version of the document. */
      #$textTable = null;

      /** The tabs for selecting which mode to look at. */
      #$viewTabs = null;

      /** The row selector for the rendered version of the document. */
      #renderedSelector = null;

      /** The row selector for the raw (source) version of the document. */
      #textSelector = null;

      /**
       * Initialize the view.
       *
       * Args:
       *     options (object):
       *         Options for the view.
       */
      initialize(options) {
        super.initialize(options);
        this.on('commentBlockViewAdded', this._placeCommentBlockView, this);
        this.router = new Backbone.Router({
          routes: {
            ':viewMode(/line:lineNum)': 'viewMode'
          }
        });
        this.listenTo(this.router, 'route:viewMode', (viewMode, lineNum) => {
          /*
           * Router's pattern matching isn't very good. Since we don't
           * want to stick "view" or something before the view mode,
           * and we want to allow for view, line, or view + line, we need
           * to check and transform viewMode if it seems to be a line
           * reference.
           */
          if (viewMode.indexOf('line') === 0) {
            lineNum = viewMode.substr(4);
            viewMode = null;
          }
          if (viewMode) {
            this.model.set('viewMode', viewMode);
          }
          if (lineNum) {
            this._scrollToLine(lineNum);
          }
        });
      }

      /**
       * Remove the reviewable from the DOM.
       *
       * Returns:
       *     TextBasedReviewableView:
       *     This object, for chaining.
       */
      remove() {
        this.#textSelector.remove();
        this.#renderedSelector.remove();
        return super.remove();
      }

      /**
       * Render the view.
       */
      renderContent() {
        this.#$viewTabs = this.$('.text-review-ui-views .rb-c-tabs__tab');

        // Set up the source text table.
        this.#$textTable = this.$('.text-review-ui-text-table');
        this.#textSelector = new TextCommentRowSelector({
          el: this.#$textTable,
          reviewableView: this
        });
        this.#textSelector.render();
        if (this.model.get('hasRenderedView')) {
          // Set up the rendered table.
          this.#$renderedTable = this.$('.text-review-ui-rendered-table');
          this.#renderedSelector = new TextCommentRowSelector({
            el: this.#$renderedTable,
            reviewableView: this
          });
          this.#renderedSelector.render();
        }
        this.listenTo(this.model, 'change:viewMode', this._onViewChanged);
        const $fileHeader = this.$('.review-ui-header');
        if (this.model.get('numRevisions') > 1) {
          const revisionSelectorView = new RB.FileAttachmentRevisionSelectorView({
            el: $fileHeader.find('#attachment_revision_selector'),
            model: this.model
          });
          revisionSelectorView.render();
          this.listenTo(revisionSelectorView, 'revisionSelected', this._onRevisionSelected);
          const revisionLabelView = new RB.FileAttachmentRevisionLabelView({
            el: $fileHeader.find('#revision_label'),
            model: this.model
          });
          revisionLabelView.render();
          this.listenTo(revisionLabelView, 'revisionSelected', this._onRevisionSelected);
        }
        const reviewURL = this.model.get('reviewRequest').get('reviewURL');
        const attachmentID = this.model.get('fileAttachmentID');
        const diffID = this.model.get('diffAgainstFileAttachmentID');
        Backbone.history.start({
          root: diffID === null ? `${reviewURL}file/${attachmentID}/` : `${reviewURL}file/${diffID}-${attachmentID}/`
        });
      }

      /**
       * Callback for when a new file revision is selected.
       *
       * This supports single revisions and diffs. If ``base`` is 0, a
       * single revision is selected, If not, the diff between ``base`` and
       * ``tip`` will be shown.
       *
       * Args:
       *     revisions (array of number):
       *         A 2-element array containing the new revisions to be viewed.
       */
      _onRevisionSelected(revisions) {
        const [base, tip] = revisions;

        // Ignore clicks on No Diff Label.
        if (tip === 0) {
          return;
        }
        const revisionIDs = this.model.get('attachmentRevisionIDs');
        const revisionTip = revisionIDs[tip - 1];

        /*
         * Eventually these hard redirects will use a router
         * (see diffViewerPageView.js for example)
         * this.router.navigate(base + '-' + tip + '/', {trigger: true});
         */
        let redirectURL;
        if (base === 0) {
          redirectURL = `../${revisionTip}/`;
        } else {
          const revisionBase = revisionIDs[base - 1];
          redirectURL = `../${revisionBase}-${revisionTip}/`;
        }
        RB.navigateTo(redirectURL, {
          replace: true
        });
      }

      /**
       * Scroll the page to the top of the specified line number.
       *
       * Args:
       *     lineNum (number):
       *         The line number to scroll to.
       */
      _scrollToLine(lineNum) {
        const $table = this._getTableForViewMode(this.model.get('viewMode'));
        const rows = $table[0].tBodies[0].rows;

        /* Normalize this to a valid row index. */
        lineNum = RB.MathUtils.clip(lineNum, 1, rows.length) - 1;
        const $row = $($table[0].tBodies[0].rows[lineNum]);
        $(window).scrollTop($row.offset().top);
      }

      /**
       * Return the table element for the given view mode.
       *
       * Args:
       *     viewMode (string):
       *         The view mode to show.
       *
       * Returns:
       *     jQuery:
       *     The table element corresponding to the requested view mode.
       */
      _getTableForViewMode(viewMode) {
        if (viewMode === 'source') {
          return this.#$textTable;
        } else if (viewMode === 'rendered' && this.model.get('hasRenderedView')) {
          return this.#$renderedTable;
        } else {
          console.assert(false, 'Unexpected viewMode ' + viewMode);
          return null;
        }
      }

      /**
       * Return the row selector for the given view mode.
       *
       * Args:
       *     viewMode (string):
       *         The view mode to show.
       *
       * Returns:
       *     RB.TextCommentRowSelector:
       *     The row selector.
       */
      _getRowSelectorForViewMode(viewMode) {
        if (viewMode === 'source') {
          return this.#textSelector;
        } else if (viewMode === 'rendered' && this.model.get('hasRenderedView')) {
          return this.#renderedSelector;
        } else {
          console.assert(false, 'Unexpected viewMode ' + viewMode);
          return null;
        }
      }

      /**
       * Add the comment view to the line the comment was created on.
       *
       * Args:
       *     commentBlockView (RB.AbstractCommentBlockView):
       *         The comment view to add.
       */
      _placeCommentBlockView(commentBlockView) {
        const commentBlock = commentBlockView.model;
        const beginLineNum = commentBlock.get('beginLineNum');
        const endLineNum = commentBlock.get('endLineNum');
        if (beginLineNum && endLineNum) {
          const viewMode = commentBlock.get('viewMode');
          const rowSelector = this._getRowSelectorForViewMode(viewMode);
          if (!rowSelector) {
            return;
          }
          let rowEls;
          if (this.model.get('diffRevision')) {
            /*
             * We're showing a diff, so we need to do a search for the
             * rows matching the given line numbers.
             */
            rowEls = rowSelector.getRowsForRange(beginLineNum, endLineNum);
          } else {
            /*
             * Since we know we have the entire content of the text in one
             * list, we don't need to use getRowsForRange here, and instead
             * can look up the lines directly in the lists of rows.
             */
            const rows = rowSelector.el.tBodies[0].rows;

            /* The line numbers are 1-based, so normalize for the rows. */
            rowEls = [rows[beginLineNum - 1], rows[endLineNum - 1]];
          }
          if (rowEls) {
            commentBlockView.setRows($(rowEls[0]), $(rowEls[1]));
            commentBlockView.$el.appendTo(commentBlockView.$beginRow[0].cells[0]);
          }
        }
      }

      /**
       * Handle a change to the view mode.
       *
       * This will set the correct tab to be active and switch which table of
       * text is shown.
       */
      _onViewChanged() {
        const viewMode = this.model.get('viewMode');
        this.#$viewTabs.removeClass('-is-active').filter(`[data-view-mode=${viewMode}]`).addClass('-is-active');
        this.#$textTable.toggle(viewMode === 'source');
        this.#$renderedTable.toggle(viewMode === 'rendered');

        /* Cause all comments to recalculate their sizes. */
        $(window).triggerHandler('resize');
      }
    }) || _class$1;

    var _class;

    /**
     * Displays a review UI for Markdown files.
     */
    let MarkdownReviewableView = spina.spina(_class = class MarkdownReviewableView extends TextBasedReviewableView {
      static className = 'markdown-review-ui';
    }) || _class;

    exports.AbstractCommentBlock = AbstractCommentBlock;
    exports.AbstractCommentBlockView = AbstractCommentBlockView;
    exports.AbstractReviewable = AbstractReviewable;
    exports.AbstractReviewableView = AbstractReviewableView;
    exports.AddFileActionView = AddFileActionView;
    exports.AddGeneralCommentActionView = AddGeneralCommentActionView;
    exports.ArchiveActionView = ArchiveActionView;
    exports.ArchiveMenuActionView = ArchiveMenuActionView;
    exports.CloseCompletedActionView = CloseCompletedActionView;
    exports.CloseDiscardedActionView = CloseDiscardedActionView;
    exports.CommentDialogView = CommentDialogView;
    exports.CommentEditor = CommentEditor;
    exports.CommentIssueBarView = CommentIssueBarView;
    exports.CommentIssueManager = CommentIssueManager;
    exports.CommentIssueManagerCommentType = CommentIssueManagerCommentType;
    exports.CreateReviewActionView = CreateReviewActionView;
    exports.DeleteActionView = DeleteActionView;
    exports.DiffCommentBlock = DiffCommentBlock;
    exports.DiffCommentBlockView = DiffCommentBlockView;
    exports.DiffCommentsHint = DiffCommentsHint;
    exports.DiffCommentsHintView = DiffCommentsHintView;
    exports.DiffComplexityIconView = DiffComplexityIconView;
    exports.DiffFile = DiffFile;
    exports.DiffFileCollection = DiffFileCollection;
    exports.DiffFileIndexView = DiffFileIndexView;
    exports.DiffReviewable = DiffReviewable;
    exports.DiffReviewableCollection = DiffReviewableCollection;
    exports.DiffReviewableView = DiffReviewableView;
    exports.DiffViewerPage = DiffViewerPage;
    exports.DiffViewerPageView = DiffViewerPageView;
    exports.DummyReviewable = DummyReviewable;
    exports.DummyReviewableView = DummyReviewableView;
    exports.EditReviewActionView = EditReviewActionView;
    exports.FileAttachmentCommentBlock = FileAttachmentCommentBlock;
    exports.FileAttachmentReviewable = FileAttachmentReviewable;
    exports.FileAttachmentReviewableView = FileAttachmentReviewableView;
    exports.FileAttachmentThumbnail = FileAttachmentThumbnail;
    exports.FileAttachmentThumbnailView = FileAttachmentThumbnailView;
    exports.ImageReviewable = ImageReviewable;
    exports.ImageReviewableView = ImageReviewableView;
    exports.MarkdownReviewableView = MarkdownReviewableView;
    exports.MuteActionView = MuteActionView;
    exports.RegionCommentBlock = RegionCommentBlock;
    exports.RegionCommentBlockView = RegionCommentBlockView;
    exports.ReviewDialogView = ReviewDialogView;
    exports.ReviewMenuActionView = ReviewMenuActionView;
    exports.ReviewRequestEditor = ReviewRequestEditor;
    exports.ReviewRequestEditorView = ReviewRequestEditorView;
    exports.ReviewRequestFields = reviewRequestFieldViews;
    exports.ReviewablePage = ReviewablePage;
    exports.ReviewablePageView = ReviewablePageView;
    exports.ScreenshotCommentBlock = ScreenshotCommentBlock;
    exports.ScreenshotReviewable = ScreenshotReviewable;
    exports.ShipItActionView = ShipItActionView;
    exports.TextBasedCommentBlockView = TextBasedCommentBlockView;
    exports.TextBasedReviewable = TextBasedReviewable;
    exports.TextBasedReviewableView = TextBasedReviewableView;
    exports.TextCommentBlock = TextCommentBlock;
    exports.TextCommentRowSelector = TextCommentRowSelector;
    exports.UnifiedBanner = UnifiedBanner;
    exports.UnifiedBannerView = UnifiedBannerView;
    exports.UpdateDiffActionView = UpdateDiffActionView;

    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=index.js.map
