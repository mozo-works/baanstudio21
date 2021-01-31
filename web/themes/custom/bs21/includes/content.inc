<?php
/**
 * @file
 * Theme and preprocess functions for nodes.
 */
function bs21_preprocess_node(&$vars) {
    if($vars['node']->bundle() == 'project' && $vars['view_mode'] == 'teaser') {
        ksm($vars);
    }
}
