
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: laynelcms
-- ---

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Uncategorized', 'Default category for uncategorized posts', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Category 2', 'Category 2 description', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(3, 'Category 3', 'Category 3 description', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `author` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `author`, `email`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 'Admin', 'admin@localhost', 'This is a comment.', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `comments` (`id`, `post_id`, `author`, `email`, `content`, `created_at`, `updated_at`) VALUES
(2, 1, 'User', 'user@localhost', 'This is another comment.', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `comments` (`id`, `post_id`, `author`, `email`, `content`, `created_at`, `updated_at`) VALUES
(3, 1, 'Guest', 'guest@localhost', 'This is a guest comment.', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `title`, `slug`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 'Welcome to LaynelCMS', 'welcome-to-laynelcms', 'Welcome to LaynelCMS! This is a simple CMS built with PHP and MySQL. You can use it to create and manage your website content.', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `posts` (`id`, `category_id`, `title`, `slug`, `content`, `created_at`, `updated_at`) VALUES
(2, 2, 'Category 2 Post', 'category-2-post', 'This is a post in category 2.', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `posts` (`id`, `category_id`, `title`, `slug`, `content`, `created_at`, `updated_at`) VALUES
(3, 3, 'Category 3 Post', 'category-3-post', 'This is a post in category 3.', '2018-05-15 14:30:00', '2018-05-15 14:30:00');


--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--
INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@localhost', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(2, 'user', 'user@localhost', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(3, 'guest', 'guest@localhost', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2018-05-15 14:30:00', '2018-05-15 14:30:00');


-- 
-- Table structure for table `roles`
--
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--
INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'user', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(3, 'guest', '2018-05-15 14:30:00', '2018-05-15 14:30:00');



--
-- Table structure for table `user_roles`
--
CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


--
-- Dumping data for table `user_roles`
--
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(2, 2, 2, '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(3, 3, 3, '2018-05-15 14:30:00', '2018-05-15 14:30:00');


-- 
-- Table structure for table `settings`
-- 
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


--
-- Dumping data for table `settings`
--
INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(1, 'title', 'LaynelCMS', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(2, 'description', 'Simple CMS built with PHP and MySQL', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(3, 'keywords', 'LaynelCMS, CMS, PHP, MySQL', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(4, 'author', 'Laynel', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(5, 'email', 'admin@localhost', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(6, 'phone', '123-456-7890', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `settings` (`id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(7, 'address', '123 Main St, Anytown USA', '2018-05-15 14:30:00', '2018-05-15 14:30:00');


-- 
-- Table structure for table `menus`    
--
CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;  


--
-- Dumping data for table `menus`
--
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Main Menu', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'Footer Menu', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(3, 'Social Links', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(4, 'Categories', '2018-05-15 14:30:00', '2018-05-15 14:30:00');    


INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(5, 'Pages', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(6, 'Blog', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(7, 'Contact', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(8, 'Login', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(9, 'Register', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(10, 'Logout', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(11, 'Profile', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(12, 'Edit Profile', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(13, 'Change Password', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(14, 'Forgot Password', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(15, 'Reset Password', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(16, 'Terms and Conditions', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(17, 'Privacy Policy', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(18, 'About Us', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(19, 'Contact Us', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(20, 'FAQ', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(21, 'Sitemap', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(22, 'Search', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(23, 'Language', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(24, 'Currency', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(25, 'My Account', '2018-05-15 14:30:00', '2018-05-15 14:30:00');


--
-- Table structure for table  'dicts'
--
CREATE TABLE `dicts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dicts`
--
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(1, 0, 'Language', 'en', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(2, 0, 'Currency', 'USD', '2018-05-15 14:30:00', '2018-05-15 14:30:00');


INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(3, 0, 'Status', 'Published', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(4, 0, 'Status', 'Draft', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(5, 0, 'Status', 'Pending', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(6, 0, 'Status', 'Trash', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(7, 0, 'Status', 'Archived', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(8, 0, 'Status', 'Deleted', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(9, 0, 'Status', 'Inactive', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(10, 0, 'Status', 'Active', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(11, 0, 'Status', 'Blocked', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(12, 0, 'Status', 'Expired', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(13, 0, 'Status', 'Suspended', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(14, 0, 'Status', 'Unpaid', '2018-05-15 14:30:00', '2018-05-15 14:30:00');
INSERT INTO `dicts` (`id`, `parent_id`, `name`, `value`, `created_at`, `updated_at`) VALUES
(15, 0, 'Status', 'Paid', '2018-05-15 14:30:00', '2018-05-15 14:30:00');


--
-- Table structure for table  'modules'
--
CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `modules`
--
INSERT INTO `modules` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Blog', 'Blog Module', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `modules` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Contact', 'Contact Module', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `modules` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(3, 'Pages', 'Pages Module', '2018-05-15 14:30:00', '2018-05-15 14:30:00');

INSERT INTO `modules` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(4, 'Users', 'Users Module', '2018-05-15 14:30:00', '2018-05-15 14:30:00');




--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);
--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);


--
-- Indexes for table `dicts`
--
ALTER TABLE `dicts`
  ADD PRIMARY KEY (`id`);


--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `dicts`
--
ALTER TABLE `dicts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;    



--
-- Constraints for dumped tables
--

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Constraints for table `dicts`
--
ALTER TABLE `dicts`
  ADD CONSTRAINT `dicts_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `dicts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_ibfk_1` FOREIGN KEY (`id`) REFERENCES `menus` (`module_id`) ON DELETE CASCADE ON UPDATE CASCADE;



--
-- End of file
--