import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getUesrs() {
        return []
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return { id };
    }
    
    @Post()
    create(@Body() user: {}) {
        return user;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() user: {}) {
        return { id, ...user };
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return { id };
    }
}
