import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import{User }from '../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
){} 
async register(registerDto: RegisterDto){
    const {email, password, name } = registerDto;

    const existingUser = await this.userRepository.findOne({
        where:{email},
    });
    
    if (existingUser) {
        throw new ConflictException('User already exists');
    }
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
        email,
        password: hashedPassword,
        name,
    }); 

    await this.userRepository.save(user);

    return {
        message: 'User registered successfully',
        email: user.email,
        name: user.name,
    };

}}
