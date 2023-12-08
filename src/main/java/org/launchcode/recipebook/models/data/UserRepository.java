package org.launchcode.recipebook.models.data;

import org.launchcode.recipebook.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

//    User findByUsername(String username);
}
