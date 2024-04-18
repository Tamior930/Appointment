<?php
class Vote
{
    private $vote_id;
    private $option_id;
    private $user_id;
    private $username;
    private $comment;

    public function __construct($vote_id, $option_id, $user_id, $username, $comment)
    {
        $this->vote_id = $vote_id;
        $this->option_id = $option_id;
        $this->user_id = $user_id;
        $this->username = $username;
        $this->comment = $comment;
    }
}