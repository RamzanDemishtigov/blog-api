var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');

const postService = require('../services/post-service');

/**
 * @swagger
 * /posts/{id}:
 *    get:
 *      summary: Get an individual post
 *      produces:
 *        - application/json
 *      tags:
 *        - Posts
 *      parameters:
 *        - name: id
 *          description: post id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a post
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *        "404":
 *          description: User not found
 */
router.get('/:id', postService.getById);

/**
 * @swagger
 * /posts:
 *    post:
 *      summary: Creates a new post
 *      produces:
 *        - application/json
 *      tags:
 *        - Posts
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        description: Data for new post
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *        "201":
 *          description: returns created post
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *        "401":
 *          description: User not authenticated
 */
router.post('/',auth, postService.add);

/**
 * @swagger
 * /posts/{id}:
 *    put:
 *      summary: Updates a post's comment
 *      produces:
 *        - application/json
 *      tags:
 *        - Posts
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: post id to update
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Updated post
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: This is an updated title
 *                content:
 *                  type: text
 *                  example: This is an updated content
 *      responses:
 *        "201":
 *          description: returns updated post
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to update this post
 *        "404":
 *          description: post not found
 */
router.put('/:id', auth, postService.update);

/**
 * @swagger
 * /posts/{id}:
 *    delete:
 *      summary: Deletes a post
 *      produces:
 *        - application/json
 *      tags:
 *        - Posts
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: post id to delete
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: post deleted
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to delete this post
 *        "404":
 *          description: post not found
 */
router.delete('/:id', auth, postService.delete);

module.exports = router;