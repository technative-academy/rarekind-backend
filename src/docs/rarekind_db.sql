CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `bio` varchar(255)
);

CREATE TABLE `collections` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `name` varchar(255),
  `description` text,
  `animals` json,
  `classifications` json,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `animals` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `collection_id` int,
  `name` varchar(255),
  `classfication_id` varchar(255),
  `description` text,
  `image_url` varchar(255)
);

CREATE TABLE `classifications` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `classification_animal` (
  `animal_id` int,
  `classification_id` int
);

ALTER TABLE `collections` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `animals` ADD FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`);

ALTER TABLE `classification_animal` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `classification_animal` ADD FOREIGN KEY (`classification_id`) REFERENCES `classifications` (`id`);
